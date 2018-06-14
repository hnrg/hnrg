const permissionsCheck = require('../modules/permissions-check');

const DemographicData = require('../models/demographic-data');
const Patient = require('../models/patient');

/**
 * Get all demographics data
 * @param req
 * @param res
 * @returns void
 */
exports.getDemographicsData = async function getDemographicsData(req, res) {
  try {
    permissionsCheck(req.user, 'paciente_index');

    const { pageNumber, configuration } = req;
    const { webpage } = configuration;
    const { amountPerPage } = webpage;

    await Patient.find({ state: true })
      .where('demographicData').ne(null)
      .limit(amountPerPage)
      .skip(amountPerPage * pageNumber)
      .populate('demographicData')
      .select('demographicData')
      .exec((err, patients) => {
        if (err) {
          return res.send(400).send(err);
        }

        const demographicsData = patients.map(data => data.demographicsData);

        res.status(200).send({ demographicsData });
      });
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
exports.addDemographicData = async function addDemographicData(req, res) {
  try {
    permissionsCheck(req.user, 'paciente_new');

    const { demographicData } = req.body;

    if (!demographicData.refrigerator ||
        !demographicData.electricity ||
        !demographicData.pet ||
        !demographicData.apartmentType ||
        !demographicData.heatingType ||
        !demographicData.waterType) {
      return res.status(400).end();
    }

    const newDemographicData = new DemographicData(demographicData);
    const saved = await newDemographicData.save();

    return res.status(200).send({ demographicData: saved });
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
exports.getDemographicData = async function getDemographicData(req, res) {
  try {
    permissionsCheck(req.user, 'paciente_show');

    const demographicData = await DemographicData.findById(req.params.id)
      .populate('apartmentType heatingType waterType')
      .exec();

    if (!demographicData) {
      return res.sendStatus(404);
    }

    res.status(200).json({ demographicData });
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

exports.updateDemographicData = async function updateDemographicData(req, res) {
  try {
    permissionsCheck(req.user, 'paciente_update');

    await DemographicData.findByIdAndUpdate(req.params.id, req.body.demographicData)
      .exec((err, demographicData) => {
        if (err || demographicData == null) {
          res.status(422).json({ error: 'No demographic data was found with that id.' });
          return;
        }

        return res.status(200).json({ demographicData });
      });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    return res.status(500).send(e);
  }
};
