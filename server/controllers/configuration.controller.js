const Configuration = require('../models/configuration');

/**
 * Get all configs
 * @param req
 * @param res
 * @returns void
 */
exports.getConfigurations = async function getConfigurations(req, res) {
  try {
    permissionsCheck(req.user, 'configuracion_index');

    const configurations = await Configuration.find({}).exec();

    res.status(200).send({ configurations });
  } catch (e) {
    res.status(500).send(e);
  }
};


/**
 * Save a configuration
 * @param req
 * @param res
 * @returns void
 */
exports.addConfiguration = async function addConfiguration(req, res) {
  try {
    permissionsCheck(req.user, 'configuracion_new');

    const { configuration } = req.body;

    Configuration.findOne().exec((err, oldConfiguration) => {
      const newConfiguration = new Configuration({
        ...oldConfiguration,
        ...configuration,
      });

      newConfiguration.save((err, saved) => res.status(200).send({ configuration: saved }));
    });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};

exports.getConfiguration = async function getConfiguration(req, res) {
  try {
    permissionsCheck(req.user, 'configuracion_show');

    const configuration = await Configuration.findById(req.params.id).exec();

    res.status(200).send({ configuration });
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getCurrentConfiguration = async function getCurrentConfiguration(req, res) {
  try {
    const configuration = await Configuration.findOne({}).exec();

    res.status(200).send({ configuration });
  } catch (e) {
    res.status(500).send(e);
  }
};

