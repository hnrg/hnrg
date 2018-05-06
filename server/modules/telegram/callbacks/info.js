const moment = require('moment-timezone');

module.exports = function info(bot, msg, user) {
  const chatId = msg.from.id;
  const message = {
    chat_id: chatId,
    message_id: msg.message.message_id,
  };

  user.then((userData) => {
    let userInfo = `Nombre y apellido: ${userData.patient.firstName} ${userData.patient.lastName}\n`;
    userInfo += `${userData.patient.documentType.name}: ${userData.patient.documentNumber}\n`;
    userInfo += `Fecha de nacimiento: ${moment(userData.patient.birthday).format('DD/MM/YYYY')}\n`;
    userInfo += '\n\nSi quiere cambiar algun dato, debe comunicarse con la secretaría del Hospital.';
    bot.editMessageText(userInfo, message);
  });
};

