const { Router } = require('express');

const passport = require('../modules/passport');
const configurationMiddleware = require('../modules/middleware/configuration');
const DemographicDataController = require('../controllers/demographic-data.controller');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

const router = Router();

router.route('/demographic-data').get(requireAuth, configurationMiddleware, DemographicDataController.getDemographicData);

router.route('/demographic-data').post(requireAuth, configurationMiddleware, DemographicDataController.addDemographicData);

router.route('/demographic-data/:id').get(requireAuth, configurationMiddleware, DemographicDataController.getSingleDemographicData);

router.route('/demographic-data/:id').post(requireAuth, configurationMiddleware, DemographicDataController.updateDemographicData);

module.exports = router;

