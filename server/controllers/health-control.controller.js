const mongoose = require('mongoose');

const HealthControl = require('../models/health-control');

const permissionsCheck = require('../modules/permissions-check');

/**
 * Get all health controls
 * @param req
 * @param res
 * @returns void
 */
exports.getHealthControls = async function getHealthControls(req, res) {
  try {
    permissionsCheck(req.user, 'control_salud_index');

    const active = req.query.active || true;
    const { pageNumber, configuration } = req;
    const { webpage } = configuration;
    const { amountPerPage } = webpage;

    await HealthControl.count({ active })
      .exec((err, totalCount) => {
        if (err) {
          res.status(422).send({error: err.message});
          return;
        }

        if (!totalCount) {
          return res.status(200).send({
            total_count: 0,
            count: 0,
            healthControls: [],
          });
        }

        const healthControls = HealthControl.find({ active })
          .limit(amountPerPage)
          .skip(amountPerPage * pageNumber)
          .populate('patient user')
          .exec(($err, healthControls) => {
            if ($err) {
              res.status(422).send({error: $err.message});
              return;
            }

            res.status(200).send({
              total_count: totalCount,
              count: healthControls.length,
              healthControls,
            });
          });
      });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send({error: e.message});
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
exports.addHealthControl = async function addHealthControl(req, res) {
  try {
    permissionsCheck(req.user, 'control_salud_new');

    const { healthControl } = req.body;

    if (!healthControl.date ||
        !healthControl.weight ||
        !healthControl.pc ||
        !healthControl.ppc ||
        !healthControl.height ||
        !healthControl.patient ||
        !healthControl.patient) {
      return res.status(400).end();
    }

    const newHealthControl = new HealthControl({
      ...healthControl,
      user: req.user._id,
      weight: mongoose.Types.Decimal128.fromString(healthControl.weight),
      height: mongoose.Types.Decimal128.fromString(healthControl.height),
      pc: mongoose.Types.Decimal128.fromString(healthControl.pc),
      ppc: mongoose.Types.Decimal128.fromString(healthControl.ppc),
    });

    const saved = await newHealthControl.save();

    return res.status(200).send({ healthControl: saved });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send({error: e.message});
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
exports.getHealthControl = async function getHealthControl(req, res) {
  try {
    permissionsCheck(req.user, 'control_salud_show');

    const healthControl = await HealthControl.findById(req.params.id)
      .where('active').equals(true)
      .populate('patient user')
      .exec();

    if (!healthControl) {
      return res.sendStatus(404);
    }

    res.status(200).json({ healthControl });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send({error: e.message});
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
exports.deleteHealthControl = async function deleteHealthControl(req, res) {
  try {
    permissionsCheck(req.user, 'control_salud_destroy');

    await HealthControl.findByIdAndUpdate(req.params.id, { active: false })
      .exec((error, healthControl) => {
        if (error || healthControl == null) {
          res.status(422).json({ error: 'Control de salud no encontrado para ese id' });
          return;
        }

        return res.status(200).end();
      });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send({error: e.message});
    }

    if (e.name === 'CastError') {
      return res.sendStatus(400);
    }

    return res.status(500).send(e);
  }
};

exports.updateHealthControl = async function updateHealthControl(req, res) {
  try {
    permissionsCheck(req.user, 'control_salud_update');

    /* FIXME hc wouldnt be updated. create newone */
    await HealthControl.findByIdAndUpdate(req.params.id, {
      ...req.body.healthControl,
      user: req.user._id,
      weight: mongoose.Types.Decimal128.fromString(req.body.healthControl.weight),
      height: mongoose.Types.Decimal128.fromString(req.body.healthControl.height),
      pc: mongoose.Types.Decimal128.fromString(req.body.healthControl.pc),
      ppc: mongoose.Types.Decimal128.fromString(req.body.healthControl.ppc),
    })
      .exec((error, healthControl) => {
        if (error || healthControl == null) {
          res.status(422).json({ error: 'Control de salud no encontrado para ese id' });
          return;
        }

        return res.status(200).json({ healthControl });
      });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send({error: e.message});
    }

    if (e.name === 'CastError') {
      return res.status(400).send(e);
    }

    return res.status(500).send(e);
  }
};
