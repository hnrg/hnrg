const axios = require('axios');
const _ = require('lodash');
const moment = require('moment-timezone');

module.exports = function(bot) {
  bot.onText(/\/fecha\s+(\d{2}[-|\/]\d{2}[-|\/]\d{2,4})$/, (msg, match) => {
    const chatId = msg.chat.id;

    if (true) {
      return bot.sendMessage(chatId, "¡Sesión expirada!\nVuelva a su perfil, y seleccione 'Reservar turno' nuevamente");
    }

    var date = moment(match[1], appointment_format);
    if (!date.isValid()) {
      bot.sendMessage(chatId, "Ingrese una fecha válida");
    }
    axios.get(`${url}/api/turnos/${date.format("YYYY-MM-DD")}`).then((response) => {
      var appointments = _.chunk(response.data.appointments, 4);
      var opts = {
        reply_markup: {
          keyboard: appointments,
          resize_keyboard: true,
          one_time_keyboard: true
        }
      }
      bot.sendMessage(chatId, "Seleccione un turno", opts);
    }).catch((err) => {
      return bot.sendMessage(chatId, "Hubo un error al recuperar los turnos.\nDisculpe las molestias.\nInténtelo más tarde.");
    })
  });
};

