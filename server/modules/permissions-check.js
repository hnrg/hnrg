const _ = require('lodash');

function NotAllowedError(message) {
  this.name = 'NotAllowedError';
  this.message = message || 'The server understood the request, but is refusing to fulfill it.';
  this.stakc = (new Error()).stack;
}

NotAllowedError.prototype = Object.create(Error.prototype);
NotAllowedError.prototype.constructor = NotAllowedError;

module.exports = function(user, permission) {
  const roles = user.roles;
  var permissions = [];

  for (var i = 0; i < roles.length; ++i) {
    let role = roles[i];
    permissions = _.union(permissions, role.permissions);
  }

  if (!permissions.find(p => p.name === permission)) {
    throw new NotAllowedError();
  }
};
