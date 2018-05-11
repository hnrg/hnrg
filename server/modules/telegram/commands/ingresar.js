const Patient = require('../../../models/patient');
const serverConfig = require('../../../config/server');

const { telegramSessionTime } = serverConfig;

module.exports = function ingresar(bot, client) {
  bot.onText(/\/ingresar\s*(\S*)/, (msg, match) => {
    const chatId = msg.chat.id;
    if (!match[1]) {
      return bot.sendMessage(chatId, 'Debe ingresar un número de documento');
    }
    Patient.findOne({ documentNumber: match[1] }).exec((err, patient) => {
      if (err) {
        return bot.sendMessage(chatId, 'Número de documento no váldo');
      }

      if (!patient) {
        return bot.sendMessage(chatId, 'Usted no es paciente del hospital');
      }
      client.set(chatId, patient.documentNumber, 'EX', telegramSessionTime);
      bot.sendMessage(chatId, `Bienvenido ${patient.firstName} ${patient.lastName}`);
    });
  });
};

