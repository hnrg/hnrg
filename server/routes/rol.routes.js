const { Router } = require('express');

const passport = require('../modules/passport');
const configurationMiddleware = require('../modules/middleware/configuration');
const RolController = require('../controllers/rol.controller');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

const router = Router();

router.route('/roles').get(requireAuth, configurationMiddleware, RolController.getRoles);

router.route('/roles').post(requireAuth, configurationMiddleware, RolController.addRol);

router.route('/roles/:id').get(requireAuth, configurationMiddleware, RolController.getRol);

router.route('/roles/:id').delete(requireAuth, configurationMiddleware, RolController.deleteRol);

router.route('/roles/:id/:permission').delete(requireAuth, configurationMiddleware, RolController.deleteRolPermission);

module.exports = router;
