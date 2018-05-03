const bot = require('../modules/telegram/bot');

exports.request = function request(req, res) {
  bot.processUpdate(req.body);
  return res.sendStatus(200);
};
