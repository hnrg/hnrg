const _ = require('lodash');
const moment = require('moment-timezone');

const DemographicData = require('../models/demographic-data');
const HealthControl = require('../models/health-control');
const Patient = require('../models/patient');

const permissionsCheck = require('../modules/permissions-check');

/**
 * Get all patients
 * @param req
 * @param res
 * @returns void
 */
exports.getPatients = async function getPatients(req, res, next) {
  try {
    permissionsCheck(req.user, 'paciente_index');

    const deleted = req.query.deleted || false;
    const firstName = new RegExp(req.query.firstName || '', 'i');
    const lastName = new RegExp(req.query.lastName || '', 'i');
    const documentNumber = req.query.documentNumber || 0;
    const documentType = req.query.documentType;
    const demographicData = req.query.demographicData || null;
    const { pageNumber, configuration } = req;
    const { webpage } = configuration;
    const { amountPerPage } = webpage;

    const where = {
      deleted,
      firstName,
      lastName,
      documentNumber: {
        $gte: documentNumber,
      },
    };

    if (documentType) {
      where.documentType = documentType;
    }

    if (demographicData !== null) {
      where.demographicData = demographicData ? { $ne: null } : { $eq: null };
    }
    console.log(where);

    await Patient.count(where)
      .exec((err, totalCount) => {
        if (err) {
          throw (err);
        }

        if (!totalCount) {
          return res.status(200).send({
            total_count: 0,
            count: 0,
            patients: [],
          });
        }

        const patients = Patient.find(where)
          .limit(amountPerPage)
          .skip(amountPerPage * pageNumber)
          .populate({
            path: 'demographicData',
            populate: {
              path: 'apartmentType heatingType waterType',
            },
          })
          .populate('medicalInsurance')
          .populate('documentType')
          .exec(($err, patients) => {
            if ($err) {
              throw ($err);
            }

            res.status(200).send({
              total_count: totalCount,
              count: patients.length,
              patients,
            });
          });
      });
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
        throw (err);
      }

      if (patient) {
        if (!patient.deleted) {
          return res.sendStatus(422);
        }

        const updatedPatient = patient;
        updatedPatient.deleted = false;

        updatedPatient.save(($$err, saved) => res.status(200).json({ patient: saved }));
      }

      const newPatient = new Patient(req.body.patient);
      newPatient.save(($$err, saved) => {
        if ($$err) {
          throw ($$err);
        }

        res.status(201).send({ patient: saved });
      });
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
      .where('deleted').equals(false)
      .populate({
        path: 'demographicData',
        populate: {
          path: 'apartmentType heatingType waterType',
        },
      })
      .populate('medicalInsurance')
      .populate('documentType')
      .exec((err, patient) => {
        if (patient == null) {
          return res.status(404).end();
        }

        if (err) {
          throw (err);
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
          res.status(422).json({ error: 'No se encontró ningún paciente con ese id' });
          throw (err);
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

function ageCalculate(actual, birthday) {
  return moment(actual).diff(moment(birthday), 'days')/7;
}

function ppcStrategy(patient, healthControls) {
  return healthControls.map(healthControl => ([
    {$numberDecimal: ageCalculate(healthControl.date, patient.birthday)}, healthControl.ppc
  ]));
}

function weightStrategy(patient, healthControls) {
  return healthControls.map(healthControl => ([
    {$numberDecimal: ageCalculate(healthControl.date, patient.birthday)}, healthControl.weight
  ]));
}

function heightStrategy(patient, healthControls) {
  return healthControls.map(healthControl => {
    let {height, weight} = healthControl;
    return [height, weight];
  });
}

exports.getPatientHealthControls = async function getPatientHealthControls(req, res, next) {
  try {
    permissionsCheck(req.user, 'paciente_show');

    const { pageNumber, configuration } = req;
    const { webpage } = configuration;
    const { amountPerPage } = webpage;

    if (!['ppc', 'weight', 'height'].find(e => e === req.params.type)) {
      return res.status(422).json({ error: 'El tipo especificado es incorrecto' });
    }

    const strategy = {
      ppc: ppcStrategy,
      weight: weightStrategy,
      height: heightStrategy,
    };

    await Patient.findById(req.params.id)
      .where('deleted').equals(false)
      .exec((err, patient) => {
        if (err) {
          throw err;
        }

        if (patient == null) {
          res.status(422).json({ error: 'No se encontró ningún paciente con ese id' });
        }

        HealthControl.find({ patient: patient._id, active: true })
          .limit(amountPerPage)
          .skip(amountPerPage * pageNumber)
          .exec(($err, healthControls) => {
            if ($err) {
              throw (err);
            }

            /* TODO modificar utilizando req.params.type */

            res.status(200).json({
              healthControls: {
                name: `${patient.firstName} ${patient.lastName} - ${patient.documentNumber}`,
                data: strategy[req.params.type](patient, healthControls),
              }
            });
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
          res.status(422).json({ error: 'No se encontró ningún paciente con ese id' });
          return;
        }

        if (req.body.demographicData) {
          if (patient.demographicData) {
            DemographicData.findByIdAndUpdate(patient.demographicData, req.body.demographicData)
              .exec(($err, demographicData) => {
                if ($err) {
                  throw $err;
                }

                return res.status(200).json({ patient });
              });
          } else {
            demographicData = new DemographicData(req.body.demographicData);
            demographicData.save(($err, saved) => {
              if ($err) {
                throw $err;
              }
              patient.demographicData = saved._id;

              patient.save(($$err, $saved) => {
                if ($$err) {
                  throw $$err;
                }

                return res.status(200).json({ patient: $saved });
              });
            });
          }
        } else {
          return res.status(200).json({ patient });
        }
      });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    return res.status(500).send(e);
  }
};

exports.getDemographicDataAnalytics = async function getDemographicDataAnalytics(req, res, next) {
  try {
    permissionsCheck(req.user, 'dashboard_analytics');

    Patient.find({}).count().exec((err, totalCount) => {
      if (err) {
        throw err;
      }
      Patient.where('demographicData')
        .ne(null)
        .populate({
          path: 'demographicData',
          populate: {
            path: 'apartmentType heatingType waterType',
          },
        })
        .exec(($err, patients) => {
          if ($err) {
            throw $err;
          }

          const patientsWithDemographicData = patients.length;

          const patientsWithRefrigerator = patients.filter(patient => patient.demographicData.regrigerator).length;
          const patientsWithElectricity = patients.filter(patient => patient.demographicData.electricity).length;
          const patientsWithPet = patients.filter(patient => patient.demographicData.pet).length;

          const apartmentTypeCount = _.countBy(patients, 'demographicData.apartmentType.name');
          const heatingTypeCount = _.countBy(patients, 'demographicData.heatingType.name');
          const waterTypeCount = _.countBy(patients, 'demographicData.waterType.name');

          return res.status(200).json({
            demographicsDataAnalytics: {
              totalCount,
              patientsWithDemographicData,
              data: {
                refrigerator: {
                  count: patientsWithRefrigerator,
                  without: (patientsWithDemographicData - patientsWithRefrigerator),
                },
                electricity: {
                  count: patientsWithElectricity,
                  without: (patientsWithDemographicData - patientsWithElectricity),
                },
                pet: {
                  count: patientsWithPet,
                  without: (patientsWithDemographicData - patientsWithElectricity),
                },
                apartmentType: apartmentTypeCount,
                heatingType: heatingTypeCount,
                waterType: waterTypeCount,
              },
            },
          });
        });
    });
  } catch (e) {
    if (e.name == 'NotAllowedError') {
      return res.status(403).send(e);
    }

    return res.status(500).send(e);
  }
};
