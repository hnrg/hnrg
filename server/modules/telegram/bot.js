const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const redis = require('redis');

const serverConfig = require('../../config/server');

// Require all bot commands
const {
  ayuda,
  confirmar,
  fecha,
  hora,
  ingresar,
  perfil,
  reservar,
  turnosHoy,
  turnos,
} = require('./commands');

// Require all bot's callbacks actions
const callbacks = require('./callbacks');

const { url, redisUrl } = serverConfig;

const client = redis.createClient(redisUrl);

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
confirmar(bot, client);
ingresar(bot, client);
perfil(bot, client);
reservar(bot, client);
turnosHoy(bot, getAppointments);
turnos(bot, getAppointments);
fecha(bot, client);
hora(bot, client);


bot.on('callback_query', (msg) => {
  const callbackId = msg.id;
  const chatId = msg.from.id;

  switch (msg.data) {
    case 'turnos':
      callbacks.turnos(bot, msg, client);
      break;
    case 'reservar':
      callbacks.reservar(bot, msg, client);
      break;
    case 'info':
      callbacks.info(bot, msg, client);
      break;
    case 'desvincular':
      callbacks.desvincular(bot, msg, client);
      break;
  }
  bot.answerCallbackQuery(callbackId);
});

bot.on('webhook_error', (error) => {
  console.log(error.code);
});

module.exports = bot;
