const config = {
  tz: process.env.TZ || 'America/Argentina/Buenos_Aires',
  nodeEnv: process.env.NODE_ENV,
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/hnrg',
  testMongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/hnrg-test',
  port: process.env.PORT || 8000,
};

module.exports = config;
