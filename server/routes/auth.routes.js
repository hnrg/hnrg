const { Router } = require('express');
const passport = require('passport');

const passportService = require('../modules/passport');
const AuthController = require('../controllers/auth.controller');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

const router = Router();

router.route('/auth/login').post(requireLogin, AuthController.login);

router.route('/auth/me').get(requireAuth, AuthController.me);

module.exports = router;
