const cuid = require('cuid');
const moment = require('moment-timezone');

const secret = require('./config/secret');

const Appointment = require('./models/appointment');
const Permission = require('./models/permission');
const Rol = require('./models/rol');
const User = require('./models/user');

const dummyData = async function() {
  await Permission.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const permissions = [
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
      'usuario_update'
    ];

    Permission.create(permissions.map(permission => new Permission({name: permission})));
  });

  await Rol.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    Permission.find().exec((err, permissions) => {
      if (!permissions) {
        return;
      }

      var models = {};

      permissions.forEach(permission => {
        models[permission.name] = permission;
      });

      const adminPermissions = [
        models.usuario_index,
        models.usuario_show,
        models.usuario_new,
        models.usuario_update,
        models.usuario_destroy,
        models.paciente_index,
        models.paciente_destroy,
        models.rol_index,
        models.rol_show,
        models.rol_new,
        models.rol_update,
        models.rol_destroy,
        models.control_salud_destroy
      ];

      const receptionistPermissions = [
        models.paciente_index,
        models.paciente_show,
        models.paciente_new,
        models.paciente_update
      ];

      const pediatricianPermissions = [
        models.paciente_index,
        models.paciente_show,
        models.paciente_new,
        models.paciente_update,
        models.control_salud_index,
        models.control_salud_show,
        models.control_salud_new,
        models.control_salud_update
      ];

      const suPermissions = [
        models.usuario_index,
        models.usuario_show,
        models.usuario_new,
        models.usuario_update,
        models.usuario_destroy,
        models.paciente_index,
        models.paciente_show,
        models.paciente_new,
        models.paciente_update,
        models.paciente_destroy,
        models.rol_index,
        models.rol_show,
        models.rol_new,
        models.rol_update,
        models.rol_destroy,
        models.control_salud_index,
        models.control_salud_show,
        models.control_salud_new,
        models.control_salud_update,
        models.control_salud_destroy
      ];

      const admin = new Rol({
        name: 'Administrador',
        permissions: adminPermissions,
      });

      const receptionist = new Rol({
        name: 'Recepcionista',
        permissions: receptionistPermissions,
      });

      const pediatrician = new Rol({
        name: 'Pediatra',
        permissions: pediatricianPermissions,
      });

      const su = new Rol({
        name: 'Su',
        permissions: suPermissions,
      });

      Rol.create([admin, receptionist, pediatrician, su]);
    });
  });

  await User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    Rol.findOne({name: 'Administrador'}).exec((err, rol) => {
      const admin = new User({
        ...secret.admin,
        roles: [rol],
      });

      admin.save();
    });

    Rol.findOne({name: 'Pediatra'}).exec((err, rol) => {
      const pediatrician = new User({
        email: 'pediatra@hnrg.com',
        username: 'pediatra',
        password: 'pediatra',
        roles: [rol],
      });

      pediatrician.save();
    });

    Rol.findOne({name: 'Recepcionista'}).exec((err, rol) => {
      const receptionist = new User({
        email: 'recepcionista@hnrg.com',
        username: 'recepcionista',
        password: 'recepcionista',
        roles: [rol],
      });

      receptionist.save();
    });
  });
};

module.exports = dummyData;
