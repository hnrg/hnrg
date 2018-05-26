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

    const deleted = req.query.deleted || false;
    const { pageNumber, configuration } = req;
    const { webpage } = configuration;
    const { amountPerPage } = webpage;

    const patients = await Patient.find({ deleted })
      .limit(amountPerPage)
      .skip(amountPerPage * pageNumber)
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
exports.addPatient = async function addPatient(req, res, next) {
  try {
    permissionsCheck(req.user, 'paciente_new');

    const {
      documentType, documentNumber, firstName, lastName, birthday,
    } = req.body.patient;

    if (!documentType || !documentNumber || !firstName || !lastName || !birthday) {
      return res.status(400).end();
    }

    await Patient.findOne({
      documentType,
      documentNumber,
      firstName,
      lastName,
      birthday,
    }).exec((err, patient) => {
      if (err) {
        res.sendStatus(422);
        return next(err);
      }

      if (patient) {
        if (!patient.deleted) {
          return res.sendStatus(422);
        }

        const updatedPatient = patient;
        updatedPatient.deleted = false;
        const saved = updatedPatient.save();

        return res.status(201).json({ patient: saved });
      }

      const newPatient = new Patient(req.body.patient);
      const saved = newPatient.save();

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
exports.getPatient = async function getPatient(req, res, next) {
  try {
    permissionsCheck(req.user, 'paciente_show');

    await Patient.findById(req.params.id)
      .whare('deleted').equals(false)
      .populate('demographicData')
      .populate('medicalInsurance')
      .populate('documentType')
      .exec((err, patient) => {
        if (patient == null) {
          return res.status(404).end();
        }

        if (err) {
          return next(err);
        }

        res.status(200).json({ patient });
      });
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
    permissionsCheck(req.user, 'paciente_destroy');

    await Patient.findByIdAndUpdate(req.params.id, { deleted: true })
      .exec((err, patient) => {
        if (err || patient == null) {
          res.status(422).json({ error: 'No patient was found with that id' });
          return next(err);
        }

        res.sendStatus(200);
      });
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

    const { pageNumber, configuration } = req;
    const { webpage } = configuration;
    const { amountPerPage } = webpage;

    await Patient.findById(req.params.id)
      .where('deleted').equals(false)
      .exec((err, patient) => {
        if (err || patient == null) {
          res.status(422).json({ error: 'No patient was found with that id.' });
          return next(err);
        }

        HealthControl.find({ patient: patient._id, active: true })
          .limit(amountPerPage)
          .skip(amountPerPage * pageNumber)
          .exec(($err, healthControls) => {
            if (err || healthControls == null) {
              next(err);
            }

            /* TODO modificar utilizando req.params.type */

            res.status(200).json({ healthControls });
          });
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

        return res.status(200).json({ patient });
      });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    return res.status(500).send(e);
  }
};
