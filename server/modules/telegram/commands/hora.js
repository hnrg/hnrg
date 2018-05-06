module.exports = function hora(bot) {
  bot.onText(/\/hora\s+(\d{2}:\d{2}?)$/, (msg, match) => {
    const chatId = msg.chat.id;
    const opts = {
      reply_markup: {
        remove_keyboard: true,
      },
    };

    if (true) {
      return bot.sendMessage(chatId, "¡Sesión expirada!\nVuelva a su perfil, y seleccione 'Reservar turno' nuevamente", opts);
    }

    bot.sendMessage(chatId, `Turno el dia a las ${match[1]}`, opts);
  });
};

