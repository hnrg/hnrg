var repl = require('repl');

const serverConfig = require('./config');
const mongoose = require('mongoose');

mongoose.connect(serverConfig.mongoURL, function(err) {
  if (err) {
    throw err;
  }

  var replServer = repl.start({prompt: "HDRG > "});

  replServer.context.epa = serverConfig.mongoURL;
  replServer.context.db = mongoose;
});
