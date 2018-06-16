const { Router } = require('express');

const passport = require('../modules/passport');
const configurationMiddleware = require('../modules/middleware/configuration');
const UserController = require('../controllers/user.controller');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

const router = Router();

router.route('/users').get(requireAuth, configurationMiddleware, UserController.getUsers);

router.route('/users/:username').get(requireAuth, configurationMiddleware, UserController.getUser);

router.route('/users/:username').post(requireAuth, configurationMiddleware, UserController.updateUser);

router.route('/users/:username').delete(requireAuth, configurationMiddleware, UserController.deleteUser);

router.route('/users').post(requireAuth, configurationMiddleware, UserController.addUser);

module.exports = router;
