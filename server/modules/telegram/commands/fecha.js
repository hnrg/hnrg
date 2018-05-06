const axios = require('axios');
const _ = require('lodash');
const moment = require('moment-timezone');
const serverConfig = require('../../../config/server');

const url = serverConfig.url;

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


module.exports = function fecha(bot) {
  bot.onText(/\/fecha\s+(\d{2}[-|\/]\d{2}[-|\/]\d{2,4})$/, (msg, match) => {
    const chatId = msg.chat.id;

    if (true) {
      return bot.sendMessage(chatId, "¡Sesión expirada!\nVuelva a su perfil, y seleccione 'Reservar turno' nuevamente");
    }

    const date = moment(match[1], appointmentFormat);
    if (!date.isValid()) {
      bot.sendMessage(chatId, 'Ingrese una fecha válida');
    }
    axios.get(`${url}/api/turnos/${date.format('YYYY-MM-DD')}`).then((response) => {
      const appointments = _.chunk(response.data.appointments, 4);
      const opts = {
        reply_markup: {
          keyboard: appointments,
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      };
      bot.sendMessage(chatId, 'Seleccione un turno', opts);
    }).catch(() => bot.sendMessage(chatId, 'Hubo un error al recuperar los turnos.\nDisculpe las molestias.\nInténtelo más tarde.'));
  });
};
