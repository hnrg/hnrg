var TelegramBot = require('node-telegram-bot-api');
var axios = require('axios');
var moment = require('moment-timezone');
var Patient = require('../../models/patient');
var Appointment = require('../../models/appointment');

// Set config variables
var TOKEN = process.env.TELEGRAM_TOKEN || '';
var url = process.env.URL || 'http://localhost:8000';
var maxConnections = parseInt(process.env.MAX_CONNECTIONS) || 40;

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
var bot = new TelegramBot(TOKEN);

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

bot.setWebHook(`${url}/api/telegram/bot${TOKEN}`, {
  max_connections: maxConnections
});


bot.onText(/\/turnos\s*(\S*)/gi, (msg, match) => {
  const chatId = msg.chat.id;
  var date;
  if (match[1]){
    date = moment(match[1], appointment_format);
  } else {
    date = moment();
  }

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

  axios.get(`${url}/api/turnos/${documentNumber}/fecha/${date.format("YYYY-MM-DD")}/hora/${date.format("HH:mm:ss")}`)
    .then( (response) => {
      bot.sendMessage(chatId, `Turno reservado para la fecha ${date.format("DD/MM/YYYY HH:mm")}\nPara el paciente ${documentNumber}`);
    })
  .catch( (error) => {
    return bot.sendMessage(chatId, "Hubo un error reservar el turno.\nDisculpe las molestias.\nInténtelo más tarde.");
  });
});

bot.onText(/\/perfil/gi, (msg, match) => {
  const chatId = msg.chat.id;
  const opt = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Mis turnos",
            callback_data: "turnos"
          },
          {
            text: "Reservar turno",
            callback_data: "reservar"
          }
        ],
        [
          {
            text: "Mi información",
            callback_data: "info"
          },
          {
            text: "Desvincular cuenta",
            callback_data: "desvincular"
          }
        ]
      ]
    }
  };
  Patient.findOne({ 'telegramId': chatId }, 'firstName lastName', (err, patient) => {
    if (err) {
      return bot.sendMessage(chatId, "Hubo un error al recuperar tu perfil.\nDisculpe las molestias.\nInténtelo más tarde.");
    }
    if (!patient) {
      return bot.sendMessage(chatId, "Parece que eres nuevo por aquí.\nDebes acercarte al hospital para registrarte como paciente.");
    }
    bot.sendMessage(chatId, `Bienvenido ${patient.firstName} ${patient.lastName}\n¿Qué quieres hacer?`, opt);
  });
});

bot.onText(/\/help/gi, (msg, match) => {
  const chatId = msg.chat.id;
  var help = "Ayuda\n";
  help += "  - /turnos [dd/mm/aaaa]\n";
  help += "    Se mostraran todos los turnos disponibles para el día dd/mm/aaaa\n";
  help += "    Si no se especifica fecha, se asume el dia corriente.\n\n";
  help += "  - /reservar documento dd/mm/aaaa hh:mm\n";
  help += "    Se reservará un turno para la persona con documento en la fecha y hora especificada\n\n"
  help += "  - /perfil\n";
  help += "    Ver perfil del usuario telegram.\n\n"

  bot.sendMessage(chatId, help);
});

bot.on("callback_query", (msg) => {
  const callbackId = msg.id;
  const chatId = msg.from.id;
  const message = {
    chat_id: chatId,
    message_id: msg.message.message_id
  };
  patient = Patient.findOne({ 'telegramId': chatId}).exec();
  switch(msg.data) {
    case "turnos":
      patient
        .then( (patient) => {
          Appointment.find({documentNumber: patient.documentNumber}).exec().then( (appointment) => {
            var data;
            if (appointment.length > 0) {
              appointments = appointment.map( (elem) => {
                return `- ${moment(elem.date).format("DD/MM/YYYY HH:mm")}`;
              })
              data = `Turnos de ${patient.firstName} ${patient.lastName}\n\n`;
              data += appointments.join("\n");
            } else {
              data = `${patient.firstName} ${patient.lastName} no tiene turnos.`;
            }
            bot.editMessageText(data, message);
          })
        })
      break;
    case "reservar":
      bot.editMessageText("Comming soon", message);
      break;
    case "info":
      patient
        .then( (patient) => {
          var info = `Nombre y apellido: ${patient.firstName} ${patient.lastName}\n`;
          info += `Número de documento: ${patient.documentNumber}\n`;
          info += `Fecha de nacimiento: ${moment(patient.birthday).format("DD/MM/YYYY")}\n`;
          info += "\n\nSi quiere cambiar algun dato, debe comunicarse con la secretaría del Hospital.";
          bot.editMessageText(info, message);
        });
      break;
    case "desvincular":
      bot.editMessageText("Comming soon", message);
      break;
  }
  bot.answerCallbackQuery(callbackId);
});

bot.on('webhook_error', (error) => {
  console.log(error.code);
});

module.exports = bot;

