module.exports = function desvincular(bot, msg, user) {
  const chatId = msg.from.id;
  const message = {
    chat_id: chatId,
    message_id: msg.message.message_id,
  };

  user.then((userData) => {
    bot.editMessageText(`Hasta luego ${userData.patient.firstName} ${userData.patient.lastName}`, message);
    userData.remove();
  });
};

