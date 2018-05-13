const Permission = require('../models/permission');

const permissionsCheck = require('../modules/permissions-check');

/**
 * Get all permissions
 * @param req
 * @param res
 * @returns void
 */
exports.getPermissions = async function getPermissions(req, res) {
  try {
    permissionsCheck(req.user, 'permiso_index');

    const { pageNumber, configuration } = req;
    const { webPage } = configuration;
    const { amountPerPage } = webPage;

    const permissions = await Permission.find({})
      .limit(amountPerPage)
      .skip(amountPerPage*page)
      .exec();

    res.status(200).send({ permissions });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};
