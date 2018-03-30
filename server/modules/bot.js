var TelegramBot = require('node-telegram-bot-api');

// Set config variables
var TOKEN = process.env.TELEGRAM_TOKEN || '';
var url = process.env.URL || 'http://localhost:3000';
var maxConnections = parseInt(process.env.MAX_CONNECTIONS) || 40;

// Basic bot configurations
var bot = new TelegramBot(TOKEN);
bot.setWebHook(`${url}/bot${TOKEN}`, {
  max_connections: maxConnections
});

bot.on('webhook_error', (error) => {
  console.log(error.code);
});

module.exports = bot;

