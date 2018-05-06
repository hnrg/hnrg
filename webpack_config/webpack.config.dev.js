const clientConfig = require('./client/webpack.config.dev');
const serverConfig = require('./server/webpack.config.dev');

module.exports = [
  clientConfig,
  serverConfig,
];
