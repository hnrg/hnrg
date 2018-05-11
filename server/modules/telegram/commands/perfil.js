module.exports = function perfil(bot, client) {
  bot.onText(/\/perfil/gi, (msg) => {
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
    client.get(chatId, (err, data) => {
      if (err) {
        return bot.sendMessage(chatId, 'Hubo un error al recuperar tu perfil.\nDisculpe las molestias.\nInténtelo más tarde.');
      }
      if (!data) {
        let message = 'Si ya eres paciente del hospital, puedes ingresar mediante /ingresar + tu dni\n\n';
        message += 'Si eres nuevo, debes acercarte al hospital, o sacar un turno mediante /reservar\n\n';
        return bot.sendMessage(chatId, message);
      }
      bot.sendMessage(chatId, 'Bienvenido\n¿Qué quieres hacer?', opt);
    });
  });
};

