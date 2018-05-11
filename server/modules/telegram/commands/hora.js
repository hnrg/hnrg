const moment = require('moment-timezone');

const appointmentFormat = [
  'HH:mm',
  'HH:mm:ss'
];

module.exports = function hora(bot, client) {
  bot.onText(/\/hora\s+(\d{2}:\d{2}?)$/, (msg, match) => {
    const chatId = msg.chat.id;
    const opts = {
      reply_markup: {
        remove_keyboard: true,
      },
    };

    const time = moment(match[1], appointmentFormat);
    if (!time.isValid()) {
      return bot.sendMessage(chatId, 'Ingrese una hora válida');
    }


    client.get(`${chatId}_turno`, (err, data) => {
      if (!data) {
        return bot.sendMessage(chatId, "¡Sesión expirada!\nVuelva a su perfil, y seleccione 'Reservar turno' nuevamente");
      }

      if (data.match('hora#')) {
        return bot.sendMessage(chatId, 'Ya ingresó una hora');
      }

      client.append(`${chatId}_turno`, `hora#${match[1]}|`);
      bot.sendMessage(chatId, `Hora: ${time.format('HH:mm')}\nNo se olvide de confirmar enviando\n/confirmar`);
    });
  });
};

