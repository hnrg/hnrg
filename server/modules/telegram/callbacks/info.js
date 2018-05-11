const moment = require('moment-timezone');
const Patient = require('../../../models/patient');

module.exports = function info(bot, msg, client) {
  const chatId = msg.from.id;
  const message = {
    chat_id: chatId,
    message_id: msg.message.message_id,
  };

  client.get(chatId, (err, data) => {
    Patient.findOne({ documentNumber: data }).populate('documentType').exec((err, patient) => {
      let userInfo = `Nombre y apellido: ${patient.firstName} ${patient.lastName}\n`;
      userInfo += `${patient.documentType.name}: ${patient.documentNumber}\n`;
      userInfo += `Fecha de nacimiento: ${moment(patient.birthday).format('DD/MM/YYYY')}\n`;
      userInfo += '\n\nSi quiere cambiar algun dato, debe comunicarse con la secretaría del Hospital.';
      bot.editMessageText(userInfo, message);
    });
  });
};

