const appointments = require('./appointment.routes');
const telegram = require('./telegram.routes');
const auth = require('./auth.routes');

module.exports = {
  appointments,
  telegram,
  auth,
};
