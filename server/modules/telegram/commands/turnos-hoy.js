const moment = require('moment-timezone');

module.exports = function turnosHoy(bot, getAppointments) {
  bot.onText(/^\/turnos$/, (msg) => {
    const chatId = msg.chat.id;
    const date = moment();
    getAppointments(chatId, date);
  });
};

