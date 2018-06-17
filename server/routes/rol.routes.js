const { Router } = require('express');

const passport = require('../modules/passport');
const configurationMiddleware = require('../modules/middleware/configuration');
const RolController = require('../controllers/rol.controller');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

const router = Router();

router.route('/roles').get(requireAuth, configurationMiddleware, RolController.getRoles);

router.route('/roles').post(requireAuth, configurationMiddleware, RolController.addRol);

router.route('/roles/:name').get(requireAuth, configurationMiddleware, RolController.getRol);

router.route('/roles/:name').post(requireAuth, configurationMiddleware, RolController.updateRol);

router.route('/roles/:name').delete(requireAuth, configurationMiddleware, RolController.deleteRol);

router.route('/roles/:name/:permission').delete(requireAuth, configurationMiddleware, RolController.deleteRolPermission);

module.exports = router;
