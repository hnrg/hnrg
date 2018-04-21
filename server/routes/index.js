const appointments = require('./appointment.routes');
const telegram = require('./telegram.routes');
const auth = require('./auth.routes');
const patients = require('./patient.routes');
const permissions = require('./permission.routes');
const roles = require('./rol.routes');
const users = require('./user.routes');

module.exports = {
  appointments,
  patients,
  permissions,
  roles,
  telegram,
  auth,
  users,
};
