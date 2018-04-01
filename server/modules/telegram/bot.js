var TelegramBot = require('node-telegram-bot-api');
var axios = require('axios');

// Set config variables
var TOKEN = process.env.TELEGRAM_TOKEN || '';
var url = process.env.URL || 'http://localhost:3000';
var maxConnections = parseInt(process.env.MAX_CONNECTIONS) || 40;

// Basic bot configurations
var bot = new TelegramBot(TOKEN);

var getAppiontments = function(chatId, date) {
  axios.get(`api/turnos/${date.format("Y-M-D")}`)
    .then( (response) => {
      if (response.data.length > 0) {
        data = response.data.map( (elem) => {
          return `- elem`
        });
        return bot.sendMessage(chatId, `Turnos para la fecha ${date.format("D-M-Y")}\n${data.join("\n")}`);
      } else {
        return bot.sendMessage(chatId, `No hay turnos disponibles para la fecha ${date.format("D-M-Y")}`);
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
  try {
    var date;
    if (match[1]){
      date = moment(match[1]);
    } else {
      date = moment();
    }
    getAppiontments(chatId, date);
  } catch(e) {
    return bot.sendMessage(chatId, "Hay un error en el formato de la fecha");
  }
})

bot.on('webhook_error', (error) => {
  console.log(error.code);
});

module.exports = bot;

