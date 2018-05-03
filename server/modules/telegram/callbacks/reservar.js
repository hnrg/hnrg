module.exports = function (bot) {
  const callbackId = msg.id;
  const chatId = msg.from.id;
  const message = {
    chat_id: chatId,
    message_id: msg.message.message_id,
  };

  let chatMessage = 'Tendrá 5 minutos para completar la reserva.\n';
  chatMessage += 'Ingrese una fecha\n';
  bot.editMessageText(chatMessage, message);
};

