const Patient = require('../models/patient');

const permissionsCheck = require('../modules/permissions-check');

/**
 * Get all patients
 * @param req
 * @param res
 * @returns void
 */
exports.getPatients = async function getPatients(req, res) {
  try {
    permissionsCheck(req.user, 'paciente_index');

    const patients = await Patient.find({})
      .populate('demographicData')
      .populate('medicalInsurance')
      .populate('documentType')
      .exec();

    return res.status(200).json({ patients });
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
exports.addPatient = async function addPatient(req, res) {
  try {
    permissionsCheck(req.user, 'paciente_new');

    const {
      documentType, documentNumber, firstName, lastName, birthday,
    } = req.body.patient;

    if (!documentType || !documentNumber || !firstName || !lastName || !birthday) {
      return res.status(403).end();
    }

    await Patient.count({
      documentType,
      documentNumber,
      firstName,
      lastName,
      birthday,
    }).exec((err, count) => {
      if (count > 0) {
        return res.status(422);
      }

      const patient = new Patient(req.body.patient);
      const saved = patient.save();

      return res.status(201).json({ patient: saved });
    });
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
exports.getPatient = async function getPatient(req, res) {
  try {
    permissionsCheck(req.user, 'paciente_show');

    const patient = await Patient.findById(req.params.id)
      .populate('demographicData')
      .populate('medicalInsurance')
      .populate('documentType')
      .exec();

    if (!patient) {
      return res.sendStatus(404);
    }

    res.status(200).json({ patient });
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
exports.deletePatient = async function deletePatient(req, res) {
  try {
    permissionsCheck(req.user, 'paciente_delete');

    await Patient.findByIdAndUpdate(req.params.id, { deleted: true });

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

exports.getPatientHealthControls = async function getPatientHealthControls(req, res, next) {
  try {
    permissionsCheck(req.user, 'paciente_show');

    await Patient.findById(req.params.id).then((err, patient) => {
      if (err || patient == null) {
        res.status(422).json({ error: 'No patient was found with that id.' });
        return next(err);
      }
    });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    return res.status(500).send(e);
  }
};

exports.updatePatient = async function updatePatient(req, res, next) {
  try {
    permissionsCheck(req.user, 'paciente_update');

    await Patient.findByIdAndUpdate(req.params.id, req.body.patient)
      .exec((err, patient) => {
        if (err || patient == null) {
          res.status(422).json({ error: 'No patient was found with that id.' });
          return next(err);
        }

        return res.status(201).json({ patient });
      });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    return res.status(500).send(e);
  }
};
