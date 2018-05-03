const Patient = require('../../../models/patient');
const TelegramUser = require('../../../models/telegram-user');

module.exports = function (bot) {
  bot.onText(/\/perfil/gi, (msg, match) => {
    const chatId = msg.chat.id;
    const opt = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Mis turnos',
              callback_data: 'turnos',
            }, {
              text: 'Reservar turno',
              callback_data: 'reservar',
            },
          ],
          [
            {
              text: 'Mi información',
              callback_data: 'info',
            }, {
              text: 'Salir',
              callback_data: 'desvincular',
            },
          ],
        ],
      },
    };
    TelegramUser.findOne({ chatId }).populate('patient').exec().then((user) => {
      if (!user || !user.patient) {
        let message = 'Si ya eres paciente del hospital, puedes ingresar mediante /ingresar + tu dni\n\n';
        message += 'Si eres nuevo, debes acercarte al hospital, o sacar un turno mediante /reservar\n\n';
        return bot.sendMessage(chatId, message);
      }
      bot.sendMessage(chatId, `Bienvenido ${user.patient.firstName} ${user.patient.lastName}\n¿Qué quieres hacer?`, opt);
    })
      .catch((err) => {
        console.log(err);
        return bot.sendMessage(chatId, 'Hubo un error al recuperar tu perfil.\nDisculpe las molestias.\nInténtelo más tarde.');
      });
  });
};

