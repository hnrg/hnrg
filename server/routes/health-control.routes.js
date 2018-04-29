const {Router} = require('express');
const passport = require('passport');

const passportService = require('../modules/passport');
const HealthControlController = require('../controllers/health-control.controller');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

const router = Router();

router.route('/healthcontrols').get(requireAuth, HealthControlController.getHealthControls);

router.route('/healthcontrols').post(requireAuth, HealthControlController.addHealthControl);

router.route('/healthcontrols/:id').get(requireAuth, HealthControlController.getHealthControl);

router.route('/healthcontrols/:id').delete(requireAuth, HealthControlController.deleteHealthControl);

module.exports = router;
