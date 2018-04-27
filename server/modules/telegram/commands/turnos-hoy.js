const moment = require('moment-timezone');

module.exports = function(bot, getAppointments) {
  bot.onText(/^\/turnos$/, (msg, match) => {
    const chatId = msg.chat.id;
    var date = moment();
    getAppointments(chatId, date);
  });
};

