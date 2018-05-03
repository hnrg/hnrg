const moment = require('moment-timezone');

module.exports = function (bot, user) {
  user.then((user) => {
    let info = `Nombre y apellido: ${user.patient.firstName} ${user.patient.lastName}\n`;
    info += `${user.patient.documentType.name}: ${user.patient.documentNumber}\n`;
    info += `Fecha de nacimiento: ${moment(user.patient.birthday).format('DD/MM/YYYY')}\n`;
    info += '\n\nSi quiere cambiar algun dato, debe comunicarse con la secretaría del Hospital.';
    bot.editMessageText(info, message);
  });
};

