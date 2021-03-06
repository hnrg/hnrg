import _ from 'lodash';

export default function permissionsCheck(user, permissions) {
  if (!user.username) {
    return null;
  }

  const roles = Array.from(user.roles || []);
  let userPermissions = Array.from([]);
  let check = true;

  roles.forEach((rol) => {
    userPermissions = _.union(userPermissions, rol.permissions);
  });

  Array.from(permissions || []).forEach((permission) => {
    if (!userPermissions.find(p => (p.name === permission))) {
      check = false;
    }
  });

  return check;
}
