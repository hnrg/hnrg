const { Router } = require('express');

const passport = require('../modules/passport');
const PatientController = require('../controllers/patient.controller');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

const router = Router();

router.route('/patients').get(requireAuth, PatientController.getPatients);

router.route('/patients').post(requireAuth, PatientController.addPatient);

router.route('/patients/:id').post(requireAuth, PatientController.updatePatient);

router.route('/patients/:id').get(requireAuth, PatientController.getPatient);

router.route('/patients/:id').delete(requireAuth, PatientController.deletePatient);

router.route('/patients/:id/healthcontrols/:type').get(requireAuth, PatientController.getPatientHealthControls);

module.exports = router;
