const ApartmentType = require('../models/apartment-type');

/**
 * Get all heating types
 * @param req
 * @param res
 * @returns void
 */
exports.getApartmentTypes = async function getApartmentTypes(req, res) {
  try {
    const apartmentTypes = await ApartmentType.find({})
      .exec();

    res.status(200).send({ apartmentTypes });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};
