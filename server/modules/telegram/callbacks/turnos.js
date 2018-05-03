const Appointment = require('../../../models/appointment');
const moment = require('moment-timezone');

module.exports = function (bot, user) {
  user.then((user) => {
    Appointment.find({ documentNumber: user.patient.documentNumber }).exec().then((appointment) => {
      let data;
      if (appointment.length > 0) {
        appointments = appointment.map(elem => `- ${moment(elem.date).format('DD/MM/YYYY HH:mm')}`);
        data = `Turnos de ${user.patient.firstName} ${user.patient.lastName}\n\n`;
        data += appointments.join('\n');
      } else {
        data = `${user.patient.firstName} ${user.patient.lastName} no tiene turnos.`;
      }
      bot.editMessageText(data, message);
    });
  });
};

