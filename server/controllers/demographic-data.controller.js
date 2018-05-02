const DemographicData = require('../models/demographic-data');

const permissionsCheck = require('../modules/permissions-check');

/**
 * Get all demographics data
 * @param req
 * @param res
 * @returns void
 */
exports.getDemographicsData = async function(req, res) {
  try {
    permissionsCheck(req.user, 'control_salud_index');

    const demographicsData = await DemographicData.find({}).populate('apartmentType heatingType waterType').exec();

    res.status(200).send({demographicsData});
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};

/**
 * Save a demographics data
 * @param req
 * @param res
 * @returns void
 */
exports.addDemographicData = async function(req, res) {
  try {
    permissionsCheck(req.user, 'control_salud_new');

    const {demographicData} = req.body;

    /* check params
    if (!healthControl fields) {
      return res.status(403).end();
    }

    const badRequest = rol.permissions.find(permissionId => {
      let permission = Permission.findById(permissionId).exec();
      return !permission;
    });

    if (badRequest) {
      return res.status(403);
    }

    */

    const newDemographicData = new DemographicData(demographicData);
    const saved = await newDemographicData.save();

    return res.status(200).send({demographicData: saved});
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};

/**
 * Get a single demographic data by slug
 * @param req
 * @param res
 * @returns void
 */
exports.getDemographicData = async function(req, res) {
  try {
    permissionsCheck(req.user, 'control_salud_show');

    const demographicData = await DemographicData.findById(req.params.id)
      .populate('apartmentType heatingType waterType')
      .exec();

    if (!demographicData) {
      return res.sendStatus(404);
    }

    res.status(200).json({demographicData});
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
 * Delete a demographic data by slug
 * @param req
 * @param res
 * @returns void
 */
exports.deleteDemographicData = async function(req, res) {
  try {
    permissionsCheck(req.user, 'control_salud_delete');

    const demographicData = await DemographicData.findById(req.params.id).exec();

    if (!demographicData) {
      return res.sendStatus(404);
    }

    // Change to logical delete
    await demographicData.remove();
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
