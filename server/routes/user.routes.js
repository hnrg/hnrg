const { Router } = require('express');

const passport = require('../modules/passport');
const UserController = require('../controllers/user.controller');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

const router = Router();

router.route('/users').get(requireAuth, UserController.getUsers);

router.route('/users/:id').get(requireAuth, UserController.getUser);

router.route('/users/:id').post(requireAuth, UserController.updateUser);

router.route('/users').post(requireAuth, UserController.addUser);

module.exports = router;
