const MedicalInsurance = require('../models/medical-insurance');

/**
 * Get all medical insurances
 * @param req
 * @param res
 * @returns void
 */
exports.getMedicalInsurances = async function getMedicalInsurances(req, res) {
  try {
    const medicalInsurances = await MedicalInsurance.find({})
      .exec();

    res.status(200).send({ medicalInsurances });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};
