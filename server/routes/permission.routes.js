const {Router} = require('express');
const passport = require('passport');

const passportService = require('../modules/passport');
const PermissionController = require('../controllers/permission.controller');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

const router = Router();

router.route('/permissions').get(requireAuth, PermissionController.getPermissions);

module.exports = router;
