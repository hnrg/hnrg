const moment = require('moment-timezone');

const appointment_format = [
  "DD-MM-YYYY",
  "DD/MM/YYYY",
  "DD-MM-YY",
  "DD/MM/YY",
  "YY-MM-DD",
  "YY/MM/DD",
  "YYYY-MM-DD",
  "YYYY/MM/DD"
];

module.exports = function(bot, getAppointments) {
  bot.onText(/\/turnos\s*(\S+)/gi, (msg, match) => {
    const chatId = msg.chat.id;
    var date = moment(match[1], appointment_format);

    if (!date.isValid()) {
      var help = "Fecha no válida\nFormatos válidos:\n";
      help += `    ${appointment_format.join("\n    ").replace(/Y/g, "A")}\n\n`;
      help += "A: año - M: Mes - D: día";

      return bot.sendMessage(chatId, help);
    }

    getAppointments(chatId, date);
  });
};

