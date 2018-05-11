const { Router } = require('express');

const passport = require('../modules/passport');
const configurationMiddleware = require('../modules/middleware/configuration');
const ConfigurationController = require('../controllers/configuration.controller');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

const router = Router();

router.route('/configurations').post(requireAuth, configurationMiddleware, ConfigurationController.getConfigurations);

router.route('/configurations/current').get(ConfigurationController.getCurrentConfiguration);

router.route('/configurations/:id').get(requireAuth, configurationMiddleware, ConfigurationController.getConfiguration);

module.exports = router;
