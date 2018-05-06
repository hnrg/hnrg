const moment = require('moment-timezone');

const appointmentFormat = [
  'DD-MM-YYYY',
  'DD/MM/YYYY',
  'DD-MM-YY',
  'DD/MM/YY',
  'YY-MM-DD',
  'YY/MM/DD',
  'YYYY-MM-DD',
  'YYYY/MM/DD',
];

module.exports = function turnos(bot, getAppointments) {
  bot.onText(/\/turnos\s*(\S+)/gi, (msg, match) => {
    const chatId = msg.chat.id;
    const date = moment(match[1], appointmentFormat);

    if (!date.isValid()) {
      let help = 'Fecha no válida\nFormatos válidos:\n';
      help += `    ${appointmentFormat.join('\n    ').replace(/Y/g, 'A')}\n\n`;
      help += 'A: año - M: Mes - D: día';

      return bot.sendMessage(chatId, help);
    }

    getAppointments(chatId, date);
  });
};

