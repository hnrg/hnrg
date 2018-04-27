const axios = require('axios');
const moment = require('moment-timezone');

module.exports = function(bot) {
  bot.onText(/\/reservar\s*(\S*)\s*(\S*)\s*(\S*)/gi, (msg, match) => {
    const chatId = msg.chat.id;

    if (!match[1]) {
      return bot.sendMessage(chatId, "No se especificó número de documento");
    } else if (!match[2]) {
      return bot.sendMessage(chatId, "No se especificó fecha del turno");
    } else if (!match[3]) {
      return bot.sendMessage(chatId, "No se especificó la hora del turno");
    }

    const documentNumber = parseInt(match[1]);
    if (isNaN(documentNumber)) {
      return bot.sendMessage(chatId, "Número de documento invalido");
    }

    const date = moment(`${match[2]} ${match[3]}`, new_appointment_format);
    if (!date.isValid()) {
      return bot.sendMessage(chatId, "Fecha u hora inválida");
    }

    axios.post(`${url}/api/turnos/`, {
      appointment: {
        documentNumber: documentNumber,
        date: date.format("YYYY-MM-DD"),
        time: date.format("HH:mm:ss")
      }
    }).then((response) => {
      bot.sendMessage(chatId, `Turno reservado para la fecha ${date.format("DD/MM/YYYY HH:mm")}\nPara el paciente ${documentNumber}`);
    }).catch((error) => {
      console.log(error);
      return bot.sendMessage(chatId, "Hubo un error reservar el turno.\nInténtelo más tarde.\nDisculpe las molestias.");
    });
  });
};

