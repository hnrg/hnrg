module.exports = function (bot, user) {
  user.then((user) => {
    bot.editMessageText(`Hasta luego ${user.patient.firstName} ${user.patient.lastName}`, message);
    user.remove();
  });
};

