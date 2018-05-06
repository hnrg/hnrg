const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const serverConfig = require('../../config/server');
const TelegramUser = require('../../models/telegram-user');

// Require all bot commands
const {
  ayuda,
  fecha,
  hora,
  ingresar,
  perfil,
  reservar,
  turnos_hoy,
  turnos,
} = require('./commands');

// Require all bot's callbacks actions
const callbacks = require('./callbacks');

const url = serverConfig.url;

// Basic bot configurations
const bot = new TelegramBot(serverConfig.telegram_token);

const getAppointments = function (chatId, date) {
  axios.get(`${url}/api/turnos/${date.format('YYYY-MM-DD')}`).then((response) => {
    if (response.data.availables.length > 0) {
      data = response.data.availables.map(elem => `- ${elem}`);
      return bot.sendMessage(chatId, `Turnos para la fecha ${date.format('DD-MM-Y')}\n    ${data.join('\n    ')}`);
    }
    return bot.sendMessage(chatId, `No hay turnos disponibles para la fecha ${date.format('DD-MM-Y')}`);
  }).catch(error => bot.sendMessage(chatId, 'Hubo un error al recuperar los turnos.\nDisculpe las molestias.\nInténtelo más tarde.'));
};

bot.setWebHook(`${url}/api/telegram/bot${serverConfig.telegram_token}`, { max_connections: serverConfig.telegramMaxConnections });

// Set commands
ayuda(bot);
ingresar(bot);
perfil(bot);
reservar(bot);
turnos_hoy(bot, getAppointments);
turnos(bot, getAppointments);
fecha(bot);
hora(bot);


bot.on('callback_query', (msg) => {
  const callbackId = msg.id;
  const chatId = msg.from.id;

  user = TelegramUser.findOne({ chatId }).populate({
    path: 'patient',
    populate: {
      path: 'documentType',
    },
  }).exec();

  switch (msg.data) {
    case 'turnos':
      callbacks.turnos(bot, msg, user);
      break;
    case 'reservar':
      callbacks.reservar(bot, msg);
      break;
    case 'info':
      callbacks.info(bot, msg);
      break;
    case 'desvincular':
      callbacks.desvincular(bot, msg);
      break;
  }
  bot.answerCallbackQuery(callbackId);
});

bot.on('webhook_error', (error) => {
  console.log(error.code);
});

module.exports = bot;
