module.exports = function ayuda(bot) {
  bot.onText(/\/ayuda/gi, (msg) => {
    const chatId = msg.chat.id;
    let help = 'Ayuda\n';
    help += '  -/ingresar documento\n';
    help += '    Ingresar al sistema con tu número de documento\n\n';
    help += '  - /turnos [dd/mm/aaaa]\n';
    help += '    Se mostraran todos los turnos disponibles para el día dd/mm/aaaa\n';
    help += '    Si no se especifica fecha, se asume el dia corriente.\n\n';
    help += '  - /reservar documento dd/mm/aaaa hh:mm\n';
    help += '    Se reservará un turno para la persona con documento en la fecha y hora especificada\n\n';
    help += '  - /perfil\n';
    help += '    Ver perfil del usuario telegram.\n\n';

    bot.sendMessage(chatId, help);
  });
};

