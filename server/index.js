/* eslint no-console: 0 */

const express = require('express');
const moment = require('moment-timezone');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
const mongoose = require('mongoose');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// Local Imports
const serverConfig = require('./config/server');
const { secret } = require('./config/secret');
const routes = require('./routes');
const dummyData = require('./dummyData');
const clientConfig = require('../webpack/client/webpack.config.dev');
const SSR = require('./SSR');

moment.tz.setDefault(serverConfig.tz);

// Initialize Express App
const app = express();

app.use(cookieParser());
app.use(helmet());
app.use(session({
  secret,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: true,
    httpOnly: true,
  },
}));

// Set environment flags
const isTest = serverConfig.nodeEnv === 'test';
const isDev = serverConfig.nodeEnv === 'development';

// HMR Stuff
if (isDev) {
  const middlewareOptions = {
    stats: { colors: true },
    noInfo: false,
    lazy: false,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost',
    },
    publicPath: clientConfig.output.publicPath,
  };

  const compiler = webpack(clientConfig);
  const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, middlewareOptions);
  app.use(webpackDevMiddlewareInstance);
  app.use(webpackHotMiddleware(compiler));
}


// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(isTest ? serverConfig.testMongoURL : serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!');
    throw error;
  } else {
    console.log(`Connected to DB at ${isTest ? serverConfig.testMongoURL : serverConfig.mongoURL}`);
  }

  // feed some dummy data in DB.
  dummyData();
});

// Apply body Parser and server public assets and routes
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

// server public assets and routes
app.use(express.static(path.resolve(__dirname, '..', 'dist')));

app.use('/api', routes.apartmentType);
app.use('/api', routes.appointments);
app.use('/api', routes.auth);
app.use('/api', routes.configurations);
app.use('/api', routes.documentTypes);
app.use('/api', routes.healthControl);
app.use('/api', routes.heatingType);
app.use('/api', routes.medicalInsurance);
app.use('/api', routes.patients);
app.use('/api', routes.permissions);
app.use('/api', routes.roles);
app.use('/api', routes.telegram);
app.use('/api', routes.users);
app.use('/api', routes.waterType);

app.get('*', SSR.default);

if (!isTest) {
  // Testing does not require you to listen on a port
  app.listen(serverConfig.port, (error) => {
    if (!error) {
      console.log(`HNRG App is running on port: ${serverConfig.port}! Build something amazing!`);
    }
  });
}

module.exports = app;
