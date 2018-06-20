const _ = require('lodash');

function NotAllowedError(message) {
  this.name = 'NotAllowedError';
  this.message = message || 'El servidor comprende el pedido, pero se niega a responderla.';
  this.stack = (new Error()).stack;
}

NotAllowedError.prototype = Object.create(Error.prototype);
NotAllowedError.prototype.constructor = NotAllowedError;

module.exports = function permissionsCheck(user, permission) {
  const roles = Array.from(user.roles);
  let permissions = Array.from([]);

  roles.forEach((rol) => {
    permissions = _.union(permissions, rol.permissions);
  });

  if (!permissions.find(p => (p.name === permission))) {
    throw new NotAllowedError();
  }
};
