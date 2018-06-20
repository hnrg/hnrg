const { Router } = require('express');

const passport = require('../modules/passport');
const configurationMiddleware = require('../modules/middleware/configuration');
const PatientController = require('../controllers/patient.controller');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

const router = Router();

router.route('/patients').get(requireAuth, configurationMiddleware, PatientController.getPatients);

router.route('/patients').post(requireAuth, configurationMiddleware, PatientController.addPatient);

router.route('/patients/analytics').get(requireAuth, configurationMiddleware, PatientController.getDemographicDataAnalytics);

router.route('/patients/:id').post(requireAuth, configurationMiddleware, PatientController.updatePatient);

router.route('/patients/:id').get(requireAuth, configurationMiddleware, PatientController.getPatient);

router.route('/patients/:id').delete(requireAuth, configurationMiddleware, PatientController.deletePatient);

router.route('/patients/:id/health-controls/:type').get(requireAuth, configurationMiddleware, PatientController.getPatientHealthControls);

module.exports = router;

