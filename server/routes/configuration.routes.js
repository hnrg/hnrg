const {Router} = require('express');
const passport = require('passport');

const passportService = require('../modules/passport');
const ConfigurationController = require('../controllers/configuration.controller');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

const router = Router();

router.route('/configurations').post(requireAuth, ConfigurationController.getConfigurations);

router.route('/configurations/current').get(ConfigurationController.getCurrentConfiguration);

router.route('/configurations/:id').get(requireAuth, ConfigurationController.getConfiguration);

module.exports = router;
