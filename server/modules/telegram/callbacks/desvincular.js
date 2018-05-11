module.exports = function desvincular(bot, msg, client) {
  const chatId = msg.from.id;
  const message = {
    chat_id: chatId,
    message_id: msg.message.message_id,
  };

  client.del(chatId);
  bot.editMessageText('Hasta luego', message);
};

