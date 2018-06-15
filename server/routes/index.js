const apartamentType = require('./apartament-type.routes');
const appointments = require('./appointment.routes');
const auth = require('./auth.routes');
const configurations = require('./configuration.routes');
const demographicData = require('./demographic-data.routes');
const documentTypes = require('./document-types.routes');
const healthControl = require('./health-control.routes');
const heatingType = require('./heating-type.routes');
const medicalInsurance = require('./medical-insurance.routes');
const patients = require('./patient.routes');
const permissions = require('./permission.routes');
const roles = require('./rol.routes');
const telegram = require('./telegram.routes');
const users = require('./user.routes');
const waterType = require('./water-type.routes');

module.exports = {
  apartamentType,
  appointments,
  auth,
  configurations,
  demographicData,
  documentTypes,
  healthControl,
  heatingType,
  medicalInsurance,
  patients,
  permissions,
  roles,
  telegram,
  users,
  waterType,
};

