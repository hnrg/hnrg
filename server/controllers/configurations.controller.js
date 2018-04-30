const Configuration = require('../models/configuration');

const permissionsCheck = require('../modules/permissions-check');

/**
 * Get all configs
 * @param req
 * @param res
 * @returns void
 */
exports.getConfigurations = async function(req, res) {
  try {
    const configurations = await Configuration.find({}).exec();

    res.status(200).send({configurations});
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};
