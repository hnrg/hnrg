const { Router } = require('express');

const passport = require('../modules/passport');
const configurationMiddleware = require('../modules/middleware/configuration');
const HealthControlController = require('../controllers/health-control.controller');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

const router = Router();

router.route('/healthcontrols').get(requireAuth, configurationMiddleware, HealthControlController.getHealthControls);

router.route('/healthcontrols').post(requireAuth, configurationMiddleware, HealthControlController.addHealthControl);

router.route('/healthcontrols/:id').get(requireAuth, configurationMiddleware, HealthControlController.getHealthControl);

router.route('/healthcontrols/:id').delete(requireAuth, configurationMiddleware, HealthControlController.deleteHealthControl);

module.exports = router;
