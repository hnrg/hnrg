const Appointment = require('../../../models/appointment');
const moment = require('moment-timezone');

module.exports = function turnos(bot, msg, user) {
  const chatId = msg.from.id;
  const message = {
    chat_id: chatId,
    message_id: msg.message.message_id,
  };

  user.then((userData) => {
    Appointment.find({ documentNumber: userData.patient.documentNumber })
      .exec()
      .then((appointment) => {
        let data;
        if (appointment.length > 0) {
          const appointments = appointment.map(elem => `- ${moment(elem.date).format('DD/MM/YYYY HH:mm')}`);
          data = `Turnos de ${userData.patient.firstName} ${userData.patient.lastName}\n\n`;
          data += appointments.join('\n');
        } else {
          data = `${userData.patient.firstName} ${userData.patient.lastName} no tiene turnos.`;
        }
        bot.editMessageText(data, message);
      });
  });
};

