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


module.exports = function fecha(bot, client) {
  bot.onText(/\/fecha\s+(\d{2}[-|\/]\d{2}[-|\/]\d{2,4})$/, (msg, match) => {
    const chatId = msg.chat.id;

    client.get(`${chatId}_turno`, (err, data) => {
      if (!data) {
        return bot.sendMessage(chatId, "¡Sesión expirada!\nVuelva a su perfil, y seleccione 'Reservar turno' nuevamente");
      }
      if (data.match('fecha#')) {
        return bot.sendMessage(chatId, 'Ya ingresó una fecha');
      }
      const date = moment(match[1], appointmentFormat);
      if (!date.isValid()) {
        return bot.sendMessage(chatId, 'Ingrese una fecha válida');
      }
      client.append(`${chatId}_turno`, `fecha#${date.format('YYYY-MM-DD')}|`);
      bot.sendMessage(chatId, `Fecha: ${date.format('DD/MM/YYYY')}\nNo se olvide de confirmar enviando\n/confirmar`);
    });
  });
};

