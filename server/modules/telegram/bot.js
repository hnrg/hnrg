const serverConfig = require('./config');
var TelegramBot = require('node-telegram-bot-api');
var axios = require('axios');
var moment = require('moment-timezone');
var Appointment = require('../../models/appointment');
var Patient = require('../../models/patient');
var TelegramUser = require('../../models/telegram-user');

var url = serverConfig.url;

Array.prototype.chunk = function(groupsize){
  var sets = [], chunks, i = 0;
  chunks = this.length / groupsize;

  while(i < chunks){
    sets[i] = this.splice(0,groupsize);
    i++;
  }

  return sets;
};

const new_appointment_format = [
  "DD-MM-YYYY HH:mm",
  "DD/MM/YYYY HH:mm",
  "DD-MM-YY HH:mm",
  "DD/MM/YY HH:mm",
  "YY-MM-DD HH:mm",
  "YY/MM/DD HH:mm",
  "YYYY-MM-DD HH:mm",
  "YYYY/MM/DD HH:mm"
];

const appointment_format = [
  "DD-MM-YYYY",
  "DD/MM/YYYY",
  "DD-MM-YY",
  "DD/MM/YY",
  "YY-MM-DD",
  "YY/MM/DD",
  "YYYY-MM-DD",
  "YYYY/MM/DD"
];

// Basic bot configurations
var bot = new TelegramBot(serverConfig.telegram_token);

var getAppointments = function(chatId, date) {
  axios.get(`${url}/api/turnos/${date.format("YYYY-MM-DD")}`)
    .then( (response) => {
      if (response.data.appointments.length > 0) {
        data = response.data.appointments.map( (elem) => {
          return `- ${elem}`;
        });
        return bot.sendMessage(chatId, `Turnos para la fecha ${date.format("DD-MM-Y")}\n    ${data.join("\n    ")}`);
      } else {
        return bot.sendMessage(chatId, `No hay turnos disponibles para la fecha ${date.format("DD-MM-Y")}`);
      }
    })
  .catch( (error) => {
    return bot.sendMessage(chatId, "Hubo un error al recuperar los turnos.\nDisculpe las molestias.\nInténtelo más tarde.");
  });
}

bot.setWebHook(`${url}/api/telegram/bot${serverConfig.telegram_token}`, {
  max_connections: serverConfig.telegramMaxConnections
});


bot.onText(/^\/turnos$/, (msg, match) => {
  const chatId = msg.chat.id;
  var date = moment();
  getAppointments(chatId, date);
});

bot.onText(/\/turnos\s*(\S+)/gi, (msg, match) => {
  const chatId = msg.chat.id;
  var date = moment(match[1], appointment_format);

  if (!date.isValid()) {
    var help = "Fecha no válida\nFormatos válidos:\n";
    help += `    ${appointment_format.join("\n    ").replace(/Y/g, "A")}\n\n`;
    help += "A: año - M: Mes - D: día";

    return bot.sendMessage(chatId, help);
  }

  getAppointments(chatId, date);
});

bot.onText(/\/reservar\s*(\S*)\s*(\S*)\s*(\S*)/gi, (msg, match) => {
  const chatId = msg.chat.id;

  if (!match[1]) {
    return bot.sendMessage(chatId, "No se especificó número de documento");
  } else if(!match[2]) {
    return bot.sendMessage(chatId, "No se especificó fecha del turno");
  } else if(!match[3]) {
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
      document: documentNumber,
      date: date.format("YYYY-MM-DD"),
      time: date.format("HH:mm:ss")
    }
  })
  .then( (response) => {
    bot.sendMessage(chatId, `Turno reservado para la fecha ${date.format("DD/MM/YYYY HH:mm")}\nPara el paciente ${documentNumber}`);
  })
  .catch( (error) => {
    console.log(error);
    return bot.sendMessage(chatId, "Hubo un error reservar el turno.\nInténtelo más tarde.\nDisculpe las molestias.");
  });
});

bot.onText(/\/ingresar\s*(\S*)/, (msg, match) => {
  const chatId = msg.chat.id;
  if (!match[1]) {
    return bot.sendMessage(chatId, "Debe ingresar un número de documento");
  }
  Patient
    .findOne({ documentNumber: match[1]})
    .exec( (err, patient) => {
      if (err) {
        return bot.sendMessage(chatId, "Número de documento no váldo");
      }

      if(!patient) {
        return bot.sendMessage(chatId, "Usted no es paciente del hospital");
      }
      TelegramUser.findOne({ chatId: chatId }, (err, user) => {
        if (err) {
          return bot.sendMessage(chatId, "Hubo un error al ingresar al sistema\nInténtelo más tarde.\nDisculpe las molestias.");
        }

        if (!user) {
          return new TelegramUser({chatId: chatId, patient: patient.id}).save();
        }

        if (user.patient.id != patient.id) {
          user.patient = patient.id;
          user.save();
        }
      });
      bot.sendMessage(chatId, `Bienvenido ${patient.firstName} ${patient.lastName}`);
    });
});

bot.onText(/\/perfil/gi, (msg, match) => {
  const chatId = msg.chat.id;
  const opt = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Mis turnos", callback_data: "turnos" },
          { text: "Reservar turno", callback_data: "reservar" }
        ],
        [
          { text: "Mi información", callback_data: "info"},
          { text: "Salir", callback_data: "desvincular" }
        ]
      ]
    }
  };
  TelegramUser
    .findOne({ 'chatId': chatId })
    .populate('patient')
    .exec()
    .then( (user) => {
      if (!user || !user.patient) {
        var message = "Si ya eres paciente del hospital, puedes ingresar mediante /ingresar + tu dni\n\n";
        message += "Si eres nuevo, debes acercarte al hospital, o sacar un turno mediante /reservar\n\n";
        return bot.sendMessage(chatId, message);
      }
      bot.sendMessage(chatId, `Bienvenido ${user.patient.firstName} ${user.patient.lastName}\n¿Qué quieres hacer?`, opt);
    })
    .catch( (err) => {
      console.log(err);
      return bot.sendMessage(chatId, "Hubo un error al recuperar tu perfil.\nDisculpe las molestias.\nInténtelo más tarde.");
    });
});

bot.onText(/\/ayuda/gi, (msg, match) => {
  const chatId = msg.chat.id;
  var help = "Ayuda\n";
  help += "  -/ingresar documento\n";
  help += "    Ingresar al sistema con tu número de documento\n\n";
  help += "  - /turnos [dd/mm/aaaa]\n";
  help += "    Se mostraran todos los turnos disponibles para el día dd/mm/aaaa\n";
  help += "    Si no se especifica fecha, se asume el dia corriente.\n\n";
  help += "  - /reservar documento dd/mm/aaaa hh:mm\n";
  help += "    Se reservará un turno para la persona con documento en la fecha y hora especificada\n\n";
  help += "  - /perfil\n";
  help += "    Ver perfil del usuario telegram.\n\n";

  bot.sendMessage(chatId, help);
});

bot.onText(/^(\d{2}[-|\/]\d{2}[-|\/]\d{2,4})$/, (msg, match) => {
  const chatId = msg.chat.id;

  if (true) {
    return bot.sendMessage(chatId, "¡Sesión expirada!\nVuelva a su perfil, y seleccione 'Reservar turno' nuevamente");
  }

  var date = moment(match[1], appointment_format);
  if (!date.isValid()) {
    bot.sendMessage(chatId, "Ingrese una fecha válida");
  }
  axios.get(`${url}/api/turnos/${date.format("YYYY-MM-DD")}`)
    .then( (response) => {
      var appointments = response.data.appointments.chunk(4);
      var opts = {
        reply_markup: {
          keyboard: appointments,
          resize_keyboard: true,
          one_time_keyboard: true
        }
      }
      bot.sendMessage(chatId, "Seleccione un turno", opts);
    })
  .catch( (err) => {
    return bot.sendMessage(chatId, "Hubo un error al recuperar los turnos.\nDisculpe las molestias.\nInténtelo más tarde.");
  })
});

bot.onText(/^(\d{2}:\d{2}?)$/, (msg, match) => {
  const chatId = msg.chat.id;
  var opts = {
    reply_markup: {
      remove_keyboard: true
    }
  };

  if (true) {
    return bot.sendMessage(chatId, "¡Sesión expirada!\nVuelva a su perfil, y seleccione 'Reservar turno' nuevamente", opts);
  }

  bot.sendMessage(chatId, `Turno el dia a las ${match[1]}`, opts);
});

bot.on("callback_query", (msg) => {
  const callbackId = msg.id;
  const chatId = msg.from.id;
  const message = {
    chat_id: chatId,
    message_id: msg.message.message_id
  };
  user = TelegramUser
    .findOne({ chatId: chatId})
    .populate({
      path: 'patient',
      populate: {
        path: 'documentType'
      }
    })
    .exec();
  switch(msg.data) {
    case "turnos":
      user
        .then( (user) => {
          Appointment.find({documentNumber: user.patient.documentNumber}).exec().then( (appointment) => {
            var data;
            if (appointment.length > 0) {
              appointments = appointment.map( (elem) => {
                return `- ${moment(elem.date).format("DD/MM/YYYY HH:mm")}`;
              })
              data = `Turnos de ${user.patient.firstName} ${user.patient.lastName}\n\n`;
              data += appointments.join("\n");
            } else {
              data = `${user.patient.firstName} ${user.patient.lastName} no tiene turnos.`;
            }
            bot.editMessageText(data, message);
          })
        })
      break;
    case "reservar":
      var chatMessage = "Tendrá 5 minutos para completar la reserva.\n";
      chatMessage += "Ingrese una fecha\n";
      bot.editMessageText(chatMessage, message);
      break;
    case "info":
      user
        .then( (user) => {
          var info = `Nombre y apellido: ${user.patient.firstName} ${user.patient.lastName}\n`;
          info += `${user.patient.documentType.name}: ${user.patient.documentNumber}\n`;
          info += `Fecha de nacimiento: ${moment(user.patient.birthday).format("DD/MM/YYYY")}\n`;
          info += "\n\nSi quiere cambiar algun dato, debe comunicarse con la secretaría del Hospital.";
          bot.editMessageText(info, message);
        });
      break;
    case "desvincular":
      user.then( (user) => {
        bot.editMessageText(`Hasta luego ${user.patient.firstName} ${user.patient.lastName}`, message);
        user.remove();
      });
      break;
  }
  bot.answerCallbackQuery(callbackId);
});

bot.on('webhook_error', (error) => {
  console.log(error.code);
});

module.exports = bot;

