const Patients = require('../models/patient');

const permissionsCheck = require('../modules/permissions-check');

/**
 * Get all patients
 * @param req
 * @param res
 * @returns void
 */
exports.getPatients = async function(req, res) {
  try {
    permissionsCheck(req.user, 'pacientes_index');

    const patients = await Patients.find({})
    .populate('demographicData')
    .populate('medicalInsurance')
    .populate('documentType')
    .exec();

    res.status(200).send({patients});
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};

/**
 * Save a patient
 * @param req
 * @param res
 * @returns void
 */
exports.addPatient = async function(req, res) {
  try {
    permissionsCheck(req.user, 'pacientes_add');

    /* TODO */

    return res.status(200).send({patient: {}});
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};

/**
 * Get a single patient by slug
 * @param req
 * @param res
 * @returns void
 */
exports.getPatient = async function(req, res) {
  try {
    permissionsCheck(req.user, 'pacientes_show');

    const patient = await Patients.findOne({id: req.params.id})
    .populate('demographicData')
    .populate('medicalInsurance')
    .populate('documentType')
    .exec();

    if (!patient) {
      return res.sendStatus(404);
    }

    res.status(200).json({patient});
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
 * Delete a patient by slug
 * @param req
 * @param res
 * @returns void
 */
exports.deletePatient = async function(req, res) {
  try {
    permissionsCheck(req.user, 'pacientes_delete');

    /* TODO */

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
