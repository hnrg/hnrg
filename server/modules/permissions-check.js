const _ = require('lodash');

function NotAllowedError(message) {
  this.name = 'NotAllowedError';
  this.message = message || 'The server understood the request, but is refusing to fulfill it.';
  this.stack = (new Error()).stack;
}

NotAllowedError.prototype = Object.create(Error.prototype);
NotAllowedError.prototype.constructor = NotAllowedError;

module.exports = function(user, permission) {
  const roles = Array.from(user.roles);
  var permissions = Array.from([]);

  roles.forEach(rol => {
    permissions = _.union(permissions, rol.permissions);
  });

  if (!permissions.find(p => (p.name === permission))) {
    throw new NotAllowedError();
  }
};
