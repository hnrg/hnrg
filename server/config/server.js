const config = {
  telegram_token: process.env.TELEGRAM_TOKEN || '',
  url: process.env.URL || 'http://localhost:8000',
  telegramMaxConnections: parseInt(process.env.MAX_CONNECTIONS, 10) || 40,
  tz: process.env.TZ || 'America/Argentina/Buenos_Aires',
  nodeEnv: process.env.NODE_ENV,
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/hnrg',
  testMongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/hnrg-test',
  port: process.env.PORT || 8000,
};

module.exports = config;
