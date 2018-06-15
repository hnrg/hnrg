const ApartamentType = require('../models/apartament-type');

/**
 * Get all heating types
 * @param req
 * @param res
 * @returns void
 */
exports.getApartamentTypes = async function getApartamentTypes(req, res) {
  try {
    const apartamentTypes = await ApartamentType.find({})
      .exec();

    res.status(200).send({ apartamentTypes });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};
