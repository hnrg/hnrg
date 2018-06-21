const secret = require('./config/secret');
const appConfig = require('./config/app');

const Configuration = require('./models/configuration');
const Permission = require('./models/permission');
const Rol = require('./models/rol');
const User = require('./models/user');

const dummyData = async function dummyData() {
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
      'permiso_index',
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
      'configuracion_destroy',
      'configuracion_index',
      'configuracion_new',
      'configuracion_show',
      'configuracion_update',
      'dashboard_analytics',
    ];

    Permission.create(permissions.map(permission => new Permission({ name: permission })));
  });

  await Rol.count().exec((error, count) => {
    if (count > 0) {
      return;
    }

    Permission.find().exec((_error, permissions) => {
      if (!permissions) {
        return;
      }

      const models = {};

      permissions.forEach((permission) => {
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
        models.permiso_index,
        models.rol_index,
        models.rol_show,
        models.rol_new,
        models.rol_update,
        models.rol_destroy,
        models.control_salud_destroy,
        models.configuracion_destroy,
        models.configuracion_index,
        models.configuracion_new,
        models.configuracion_show,
        models.configuracion_update,
      ];

      const receptionistPermissions = [
        models.paciente_index,
        models.paciente_show,
        models.paciente_new,
        models.paciente_update,
      ];

      const pediatricianPermissions = [
        models.paciente_index,
        models.paciente_show,
        models.paciente_new,
        models.paciente_update,
        models.control_salud_index,
        models.control_salud_show,
        models.control_salud_new,
        models.control_salud_update,
      ];

      const suPermissions = [
        ...adminPermissions,
        ...receptionistPermissions,
        ...pediatricianPermissions,
      ];

      const admin = new Rol({
        name: 'Administrador',
        permissions: adminPermissions,
      });

      admin.save((err, rol) => {
        User.create({
          ...secret.admin,
          active: true,
          roles: [rol],
        });
      });

      const receptionist = new Rol({
        name: 'Recepcionista',
        permissions: receptionistPermissions,
      });

      receptionist.save((err, rol) => {
        User.create({
          email: 'recepcionista@hnrg.com',
          username: 'recepcionista',
          password: 'recepcionista',
          active: true,
          roles: [rol],
        });
      });

      const pediatrician = new Rol({
        name: 'Pediatra',
        permissions: pediatricianPermissions,
      });

      pediatrician.save((err, rol) => {
        User.create({
          email: 'pediatra@hnrg.com',
          username: 'pediatra',
          password: 'pediatra',
          active: true,
          roles: [rol],
        });
      });

      const su = new Rol({
        name: 'Su',
        permissions: suPermissions,
      });

      su.save((err, rol) => {
        User.create({
          email: 'su@hnrg.com',
          username: 'su',
          password: 'hnrg-su',
          active: true,
          roles: [rol],
        });
      });
    });
  });

  await Configuration.count().exec((_error, count) => {
    if (count > 0) {
      return;
    }

    User.findOne({
      email: secret.admin.email,
    }).exec((__error, user) => {
      const config = new Configuration({
        ...appConfig,
        user,
      });

      config.save();
    });
  });
};

module.exports = dummyData;
