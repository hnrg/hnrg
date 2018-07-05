const permissionsCheck = require('../modules/permissions-check');
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

    res.status(200).send({
      configurations,
    });
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

    let webpage = configuration.webpage || {};
    let appointments = configuration.appointments || {};
    const maintenance = configuration.maintenance || null;

    await Configuration.findOne().exec((err, oldConfiguration) => {
      if (err) {
        res.status(422).send({error: err.message});
        return;
      }

      webpage = {
        name: webpage.name || oldConfiguration.webpage.name,
        amountPerPage: webpage.amountPerPage || oldConfiguration.webpage.amountPerPage,
        email: webpage.email || oldConfiguration.webpage.email,
        description: webpage.description || oldConfiguration.webpage.description,
      };

      appointments = {
        from: appointments.from || oldConfiguration.appointments.from,
        delta: appointments.delta || oldConfiguration.appointments.delta,
        amount: appointments.amount || oldConfiguration.appointments.amount,
      };

      const newConfiguration = new Configuration({
        webpage,
        appointments,
        maintenance: maintenance || oldConfiguration.maintenance,
        user: req.user._id,
      });

      newConfiguration.save(($err, saved) => {
        if ($err) {
          res.status(422).send({error: $err.message});
          return;
        }

        res.status(201).send({ configuration: saved });
      });
    });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send({error: e.message});
    }

    res.status(500).send(e);
  }
};

exports.getConfiguration = async function getConfiguration(req, res) {
  try {
    permissionsCheck(req.user, 'configuracion_show');

    const configuration = await Configuration.findById(req.params.id).exec();

    res.status(200).send({
      configuration,
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getCurrentConfiguration = async function getCurrentConfiguration(req, res) {
  try {
    const configuration = await Configuration.findOne({}).sort('-updatedAt').populate('user').exec();

    res.status(200).send({
      configuration,
    });
  } catch (e) {
    res.status(500).send(e);
  }
};
