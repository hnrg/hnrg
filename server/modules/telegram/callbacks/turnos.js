const Appointment = require('../../../models/appointment');
const moment = require('moment-timezone');

module.exports = function turnos(bot, msg, client){
  const chatId = msg.from.id;
  const message = {
    chat_id: chatId,
    message_id: msg.message.message_id,
  };

  client.get(chatId, (err, documentNumber) => {
    Appointment.find({ documentNumber })
      .exec((err, appointments) => {
        let data;
        if (appointments.length > 0) {
          const appointments_list = appointments.map(elem => `- ${moment(elem.date).format('DD/MM/YYYY HH:mm')}`);
          data = `Turnos reservados para el número de documento ${documentNumber}\n\n`;
          data += appointments_list.join('\n');
        } else {
          data = `No se encontraron turnos reservados para el número de documento ${documentNumber}`;
        }
        bot.editMessageText(data, message);
      });
  });
};

