const HeatingType = require('../models/heating-type');

/**
 * Get all heating types
 * @param req
 * @param res
 * @returns void
 */
exports.getHeatingTypes = async function getHeatingTypes(req, res) {
  try {
    const heatingTypes = await HeatingType.find({})
      .exec();

    res.status(200).send({ heatingTypes });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send({error: e.message});
    }

    res.status(500).send(e);
  }
};
