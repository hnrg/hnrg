const secret = require('./config/secret');
const appConfig = require('./config/app');

const Configuration = require('./models/configuration');
const Permission = require('./models/permission');
const Rol = require('./models/rol');
const User = require('./models/user');
const ApartmentType = require('./models/apartment-type');
const DocumentType = require('./models/document-type');
const HeatingType = require('./models/heating-type');
const MedicalInsurance = require('./models/medical-insurance');
const WaterType = require('./models/water-type');

const dummyData = async function dummyData() {
  await Permission.count().exec((err, count) => {
    if (err) {
      throw err;
    }

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

    const permissionsModel = permissions.map(name => new Permission({ name }));

    Permission.create(permissionsModel, ($err, savedPermissions) => {
      if ($err) {
        throw $err;
      }

      const models = {};

      savedPermissions.forEach(permission => {
        models[permission.name] = permission._id;
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
        models.dashboard_analytics,
      ];

      const suPermissions = [
        ...adminPermissions,
        ...receptionistPermissions,
        ...pediatricianPermissions,
      ];

      const adminRol = new Rol({
        name: 'Administrador',
        permissions: adminPermissions,
      });

      const receptionistRol = new Rol({
        name: 'Recepcionista',
        permissions: receptionistPermissions,
      });

      const pediatricianRol = new Rol({
        name: 'Pediatra',
        permissions: pediatricianPermissions,
      });

      const suRol = new Rol({
        name: 'SuperAdmin',
        permissions: suPermissions,
      });

      Rol.create([adminRol, receptionistRol, pediatricianRol, suRol], ($$err, savedRoles) => {
        if ($$err) {
          throw $$err;
        }

        const admin = new User({
          ...secret.admin,
          active: true,
          roles: [adminRol._id],
        });

        const receptionist = new User({
          email: 'recepcionista@hnrg.com',
          username: 'recepcionista',
          password: 'recepcionista',
          active: true,
          roles: [receptionistRol._id],
        });

        const pediatrician = new User({
          email: 'pediatra@hnrg.com',
          username: 'pediatra',
          password: 'pediatra',
          active: true,
          roles: [pediatricianRol._id],
        });

        const su = new User({
          email: 'su@hnrg.com',
          username: 'su',
          password: 'hnrg-su',
          active: true,
          roles: [suRol._id],
        });

        User.create([admin, receptionist, pediatrician, su], ($$$err, savedUsers) => {
          if ($$$err) {
            throw $$$err;
          }

          Configuration.count().exec(($$$$err, count) => {
            if ($$$$err) {
              throw $$$$err;
            }

            if (count > 0) {
              return;
            }

            const config = new Configuration({
              ...appConfig,
              user: admin._id
            });

            config.save();
          });
        });
      });
    });
  });

  await ApartmentType.count().exec((err, count) => {
    if (err) {
      throw err;
    }

    if (count > 0) {
      return;
    }

    const apartmentTypes = [
      'Casa tipo A',
      'Casa tipo B',
      'Rancho',
      'Casilla',
      'Departamento',
      'Pieza/s en iniquilato',
      'Pieza/s en hotel o pension',
      'Local no construido para habitacion',
      'Vivienda movil'
    ];

    ApartmentType.create(apartmentTypes.map(name => new ApartmentType({ name })), ($err, saved) => {
      if ($err) {
        throw $err;
      }
    });
  });

  await DocumentType.count().exec((err, count) => {
    if (err) {
      throw err;
    }

    if (count > 0) {
      return;
    }

    const documentTypes = [
      'DNI',
      'LC',
      'LE',
      'CI',
      'PAS'
    ];

    DocumentType.create(documentTypes.map(name => new DocumentType({ name })), ($err, saved) => {
      if ($err) {
        throw $err;
      }
    });
  });

  await HeatingType.count().exec((err, count) => {
    if (err) {
      throw err;
    }

    if (count > 0) {
      return;
    }

    const heatingTypes = [
      'Estufa gas',
      'Estufa electrica',
      'Caldera, radiadores o losa radiante',
      'Aire acondicionado frio/calor',
      'Bomba de calor',
      'Hogar a leña',
      'Hogar a gas'
    ];

    HeatingType.create(heatingTypes.map(name => new HeatingType({ name })), ($err, saved) => {
      if ($err) {
        throw $err;
      }
    });
  });

  await WaterType.count().exec((err, count) => {
    if (err) {
      throw err;
    }

    if (count > 0) {
      return;
    }

    const waterTypes = [
      'Agua corriente',
      'Perforación',
      'Pozo',
      'Agua de lluvia',
      'Transporte por cisterna',
      'Río, canal, arroyo'
    ];

    WaterType.create(waterTypes.map(name => new WaterType({ name })), ($err, saved) => {
      if ($err) {
        throw $err;
      }
    });
  });

  await MedicalInsurance.count().exec((err, count) => {
    if (err) {
      throw err;
    }

    if (count > 0) {
      return;
    }

    const medicalInsurances = [
      'OSDE',
      'Sancor Salud',
      'Medicus',
      'Medifé',
      'Galeno',
      'Accord Salud',
      'OMINT',
      'Swiss Medical',
      'AcaSalud',
      'Bristol Medicine',
      'OSECAC',
      'Union Personal',
      'OSPACP',
      'OSDEPYM',
      'Luis Pasteur',
      'OSMEDICA',
      'IOMA',
      'OSPJN',
      'OSSSB',
      'OSPEPBA',
      'OSPE'
    ];

    MedicalInsurance.create(medicalInsurances.map(name => new MedicalInsurance({ name })), ($err, saved) => {
      if ($err) {
        throw $err;
      }
    });
  });
};

module.exports = dummyData;
