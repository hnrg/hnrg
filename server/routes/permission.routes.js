const { Router } = require('express');

const passport = require('../modules/passport');
const configurationMiddleware = require('../modules/middleware/configuration');
const PermissionController = require('../controllers/permission.controller');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

const router = Router();

router.route('/permissions').get(requireAuth, configurationMiddleware, PermissionController.getPermissions);

module.exports = router;

