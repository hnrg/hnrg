const { Router } = require('express');

const passport = require('../modules/passport');
const configurationMiddleware = require('../modules/middleware/configuration');
const DemographicDataController = require('../controllers/demographic-data.controller');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

const router = Router();

router.route('/demographicdata').get(requireAuth, configurationMiddleware, DemographicDataController.getDemographicsData);

router.route('/demographicdata').post(requireAuth, configurationMiddleware, DemographicDataController.addDemographicData);

router.route('/demographicdata/:id').get(requireAuth, configurationMiddleware, DemographicDataController.getDemographicData);

router.route('/demographicdata/:id').delete(requireAuth, configurationMiddleware, DemographicDataController.deleteDemographicData);

module.exports = router;
