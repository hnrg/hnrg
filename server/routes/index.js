const appointments = require('./appointment.routes');
const telegram = require('./telegram.routes');
const auth = require('./auth.routes');
const roles = require('./rol.routes');

module.exports = {
  appointments,
  telegram,
  auth,
  roles,
};
