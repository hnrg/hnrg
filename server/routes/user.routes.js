const {Router} = require('express');
const passport = require('passport');

const passportService = require('../modules/passport');
const UserController = require('../controllers/user.controller');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

const router = Router();

router.route('/users').get(requireAuth, UserController.getUsers);

router.route('/users/:id').get(requireAuth, UserController.getUser);

module.exports = router;
