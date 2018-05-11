module.exports = function reservar(bot, msg, client) {
  const chatId = msg.from.id;
  const message = {
    chat_id: chatId,
    message_id: msg.message.message_id,
  };

  client.get(chatId, (err, data) => {
    let chatMessage = 'Tendrá 5 minutos para completar la reserva.\n';
    chatMessage += 'Ingrese una fecha\n';
    client.set(`${chatId}_turno`, `|documento#${data}|`, 'EX', 5*60);
    bot.editMessageText(chatMessage, message);
  });
};

