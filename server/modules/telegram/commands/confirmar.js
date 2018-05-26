const axios = require('axios');
const moment = require('moment-timezone');
const serverConfig = require('../../../config/server');

const url = serverConfig.url;

const newAppointmentFormat = [
  'DD-MM-YYYY HH:mm',
  'DD/MM/YYYY HH:mm',
  'DD-MM-YY HH:mm',
  'DD/MM/YY HH:mm',
  'YY-MM-DD HH:mm',
  'YY/MM/DD HH:mm',
  'YYYY-MM-DD HH:mm',
  'YYYY/MM/DD HH:mm',
];


module.exports = function reservar(bot, client) {
  bot.onText(/\/confirmar/gi, (msg, match) => {
    const chatId = msg.chat.id;

    client.get(`${chatId}_turno`, (err, data) => {
      documentReg = /.*documento#(\d{2,10}).*/i;
      dateReg = /.*fecha#(\d{2,4}[-\/]\d{2}[-\/]\d{2}).*/i;
      timeReg = /.*hora#(\d{2}:\d{2}).*/i;

      if (!documentReg.test(data)) {
        return bot.sendMessage(chatId, 'No se especificó número de documento');
      }
      if (!dateReg.test(data)) {
        return bot.sendMessage(chatId, 'No se especificó fecha del turno');
      }
      if (!timeReg.test(data)) {
        return bot.sendMessage(chatId, 'No se especificó hora del turno');
      }

      const documentNumber = data.match(documentReg)[1];
      const date = moment(`${data.match(dateReg)[1]} ${data.match(timeReg)[1]}`, newAppointmentFormat);

      axios.post(`${url}/api/turnos/`, {
        appointment: {
          documentNumber,
          date: date.format('YYYY-MM-DD'),
          time: date.format('HH:mm:ss'),
        },
      }).then(() => {
        client.del(`${chatId}_turno`);
        bot.sendMessage(chatId, `Turno reservado para la fecha ${date.format('DD/MM/YYYY HH:mm')}\nPara el paciente ${documentNumber}`);
      })
        .catch((error) => {
          client.del(`${chatId}_turno`);
          if (error.response.status !== 400) {
            return bot.sendMessage(chatId, 'Hubo un error reservar el turno.\nInténtelo más tarde.\nDisculpe las molestias.');
          }
          bot.sendMessage(chatId, error.response.data.error);
        });
    });
  });
};

