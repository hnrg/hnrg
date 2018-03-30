var bot = require('../modules/bot');

exports.request = function (req, res) {
  bot.processUpdate(req.body);
  return res.sendStatus(200);
}

