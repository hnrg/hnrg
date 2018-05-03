const { Router } = require('express');
const passport = require('passport');

const passportService = require('../modules/passport');
const DemographicDataController = require('../controllers/demographic-data.controller');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

const router = Router();

router.route('/demographicdata').get(requireAuth, DemographicDataController.getDemographicsData);

router.route('/demographicdata').post(requireAuth, DemographicDataController.addDemographicData);

router.route('/demographicdata/:id').get(requireAuth, DemographicDataController.getDemographicData);

router.route('/demographicdata/:id').delete(requireAuth, DemographicDataController.deleteDemographicData);

module.exports = router;
