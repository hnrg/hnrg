var repl = require('repl');
var fs = require('fs');
var path = require('path');

const serverConfig = require('./config');
const mongoose = require('mongoose');

const capitalize = str => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);

const camelCase = str => {
  let string = str
    .toLowerCase()
    .replace(/[^A-Za-z0-9]/g, ' ')
    .split(' ')
    .reduce((result, word) => result + capitalize(word.toLowerCase()));

  return string.charAt(0).toUpperCase() + string.slice(1);
}

var normalizedPath = path.join(__dirname, "models");
var models = [];

fs.readdirSync(normalizedPath).forEach(file => {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    models.push({
      name: camelCase(name),
      module: require("./models/" + name)
    });
  }
});

mongoose.connect(serverConfig.mongoURL, err => {
  if (err) {
    throw err;
  }


  var replServer = repl.start({
    prompt: "hdrg > "
  });

  models.forEach(({ name, module }) => replServer.context[name] = module);

  replServer.context.epa = serverConfig.mongoURL;
  replServer.context.db = mongoose;
});
