const cuid = require('cuid');
const moment = require('moment-timezone');

const serverConfig = require('./config');
const User = require('./models/user');
const Appointment = require('./models/appointment');

const isTest = serverConfig.nodeEnv === 'test';

const dummyData = async function()
{
  User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const admin = new User({
      username: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
    });

    admin.save();
  });
};

const dummyDataForTest = async function()
{
  dummyData();

  const appointment = new Appointment({
    documentNumber: 40081109,
    date: moment().hours(16).minutes(30).seconds(0).toDate(),
  });

  appointment.save();
};

module.exports = isTest ? dummyDataForTest : dummyData;
