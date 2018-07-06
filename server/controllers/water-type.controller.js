const WaterType = require('../models/water-type');

/**
 * Get all water types
 * @param req
 * @param res
 * @returns void
 */
exports.getWaterTypes = async function getWaterTypes(req, res) {
  try {
    const waterTypes = await WaterType.find({})
      .exec();

    res.status(200).send({ waterTypes });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send({ error: e.message });
    }

    res.status(500).send(e);
  }
};
