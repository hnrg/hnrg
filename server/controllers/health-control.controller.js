const HealthControl = require('../models/health-control');

const permissionsCheck = require('../modules/permissions-check');

/**
 * Get all health controls
 * @param req
 * @param res
 * @returns void
 */
exports.getHealthControls = async function(req, res) {
  try {
    permissionsCheck(req.user, 'control_salud_index');

    const healthControls = await HealthControl.find({}).populate('patient user').exec();

    res.status(200).send({healthControls});
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};

/**
 * Save a health control
 * @param req
 * @param res
 * @returns void
 */
exports.addHealthControl = async function(req, res) {
  try {
    permissionsCheck(req.user, 'control_salud_new');

    const {healthControl} = req.body;

    /* check params
    if (!healthControl fields) {
      return res.status(403).end();
    }

    const badRequest = rol.permissions.find(permissionId => {
      let permission = Permission.findOne({id: permissionId}).exec();
      return !permission;
    });

    if (badRequest) {
      return res.status(403);
    }

    */

    const newHealthControl = new HealthControl(healthControl);
    const saved = await newHealthControl.save();

    return res.status(200).send({healthControl: saved});
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};

/**
 * Get a single health control by slug
 * @param req
 * @param res
 * @returns void
 */
exports.getHealthControl = async function(req, res) {
  try {
    permissionsCheck(req.user, 'control_salud_show');

    const healthControl = await HealthControl.findOne({
      id: req.params.id
    }).populate('patient user').exec();

    if (!healthControl) {
      return res.sendStatus(404);
    }

    res.status(200).json({healthControl});
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    if (e.name === 'CastError') {
      return res.sendStatus(400);
    }

    return res.status(500).send(e);
  }
};

/**
 * Delete a health control by slug
 * @param req
 * @param res
 * @returns void
 */
exports.deleteHealthControl = async function(req, res) {
  try {
    permissionsCheck(req.user, 'control_salud_destroy');

    const healthControl = await HealthControl.findById(req.params.id).exec();

    if (!healthControl) {
      return res.sendStatus(404);
    }

    // Change to logical delete
    await healthControl.remove();
    res.sendStatus(200);
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    if (e.name === 'CastError') {
      return res.sendStatus(400);
    }

    return res.status(500).send(e);
  }
};

