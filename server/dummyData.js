const cuid = require('cuid');
const moment = require('moment-timezone');

const serverConfig = require('./config/server');
const User = require('./models/user');
const Appointment = require('./models/appointment');
const Permission = require('./models/permission');

const isTest = serverConfig.nodeEnv === 'test';

const dummyData = async function()
{
  User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const admin = new User(serverConfig.admin);

    admin.save();
  });

  Permission.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    permissions = [
      'control_salud_destroy',
      'control_salud_index',
      'control_salud_new',
      'control_salud_show',
      'control_salud_update',
      'paciente_destroy',
      'paciente_index',
      'paciente_new',
      'paciente_show',
      'paciente_update',
      'rol_destroy',
      'rol_index',
      'rol_new',
      'rol_show',
      'rol_update',
      'usuario_destroy',
      'usuario_index',
      'usuario_new',
      'usuario_show',
      'usuario_update',
    ];

    Permission.create(permissions.map(permission => new Permission({
      name: permission,
    })));
  });
};

const dummyDataForTest = async function()
{
  const appointment = new Appointment({
    documentNumber: 40081109,
    date: moment().hours(16).minutes(30).seconds(0).toDate(),
  });

  appointment.save();
};

module.exports = isTest ? dummyDataForTest : dummyData;
