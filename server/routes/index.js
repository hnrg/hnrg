const appointments = require('./appointment.routes');
const auth = require('./auth.routes');
const configurations = require('./configuration.routes');
const demographicData = require('./demographic-data.routes');
const documentTypes = require('./document-types.routes');
const healthControl = require('./health-control.routes');
const patients = require('./patient.routes');
const permissions = require('./permission.routes');
const roles = require('./rol.routes');
const telegram = require('./telegram.routes');
const users = require('./user.routes');

module.exports = {
  appointments,
  auth,
  configurations,
  demographicData,
  documentTypes,
  healthControl,
  patients,
  permissions,
  roles,
  telegram,
  users,
};
