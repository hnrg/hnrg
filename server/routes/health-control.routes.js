const { Router } = require('express');

const passport = require('../modules/passport');
const configurationMiddleware = require('../modules/middleware/configuration');
const HealthControlController = require('../controllers/health-control.controller');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

const router = Router();

router.route('/health-controls').get(requireAuth, configurationMiddleware, HealthControlController.getHealthControls);

router.route('/health-controls').post(requireAuth, configurationMiddleware, HealthControlController.addHealthControl);

router.route('/health-controls/:id').get(requireAuth, configurationMiddleware, HealthControlController.getHealthControl);

router.route('/health-controls/:id').delete(requireAuth, configurationMiddleware, HealthControlController.deleteHealthControl);

router.route('/health-controls/:id').post(requireAuth, configurationMiddleware, HealthControlController.updateHealthControl);

module.exports = router;
