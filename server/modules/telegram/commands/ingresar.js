const axios = require('axios');
const moment = require('moment-timezone');
const Patient = require('../../../models/patient');

const new_appointment_format = [
  "DD-MM-YYYY HH:mm",
  "DD/MM/YYYY HH:mm",
  "DD-MM-YY HH:mm",
  "DD/MM/YY HH:mm",
  "YY-MM-DD HH:mm",
  "YY/MM/DD HH:mm",
  "YYYY-MM-DD HH:mm",
  "YYYY/MM/DD HH:mm"
];

module.exports = function(bot) {
  bot.onText(/\/ingresar\s*(\S*)/, (msg, match) => {
    const chatId = msg.chat.id;
    if (!match[1]) {
      return bot.sendMessage(chatId, "Debe ingresar un número de documento");
    }
    Patient.findOne({documentNumber: match[1]}).exec((err, patient) => {
      if (err) {
        return bot.sendMessage(chatId, "Número de documento no váldo");
      }

      if (!patient) {
        return bot.sendMessage(chatId, "Usted no es paciente del hospital");
      }
      TelegramUser.findOne({
        chatId: chatId
      }, (err, user) => {
        if (err) {
          return bot.sendMessage(chatId, "Hubo un error al ingresar al sistema\nInténtelo más tarde.\nDisculpe las molestias.");
        }

        if (!user) {
          return new TelegramUser({chatId: chatId, patient: patient.id}).save();
        }

        if (user.patient.id != patient.id) {
          user.patient = patient.id;
          user.save();
        }
      });
      bot.sendMessage(chatId, `Bienvenido ${patient.firstName} ${patient.lastName}`);
    });
  });
};

