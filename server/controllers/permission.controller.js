const Permission = require('../models/permission');

const permissionsCheck = require('../modules/permissions-check');

/**
 * Get all permissions
 * @param req
 * @param res
 * @returns void
 */
exports.getPermissions = async function(req, res) {
  try {
    const permissions = await Permission.find({}).exec();

    res.status(200).send({permissions});
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};
