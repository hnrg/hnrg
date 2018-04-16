const Permission = require('../models/permission');

/**
 * Get all permissions
 * @param req
 * @param res
 * @returns void
 */
exports.getPermissions = async function(req, res) {
  try {
    const permissions = await Permission.find({}).populate('permissions').exec();

    res.status(200).send({permissions});
  } catch (e) {
    res.status(500).send(e);
  }
};
