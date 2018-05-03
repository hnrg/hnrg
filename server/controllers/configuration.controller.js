const Configuration = require('../models/configuration');

/**
 * Get all configs
 * @param req
 * @param res
 * @returns void
 */
exports.getConfigurations = async function getConfigurations(req, res) {
  try {
    const configurations = await Configuration.find({}).exec();

    res.status(200).send({ configurations });
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getConfiguration = async function getConfiguration(req, res) {
  try {
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
