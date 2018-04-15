const {Router} = require('express');
const passport = require('passport');

const passportService = require('../modules/passport');
const RolController = require('../controllers/rol.controller');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

const router = Router();

router.route('/roles').get(requireAuth, RolController.getRoles);

router.route('/roles').post(requireAuth, RolController.addRol);

router.route('/roles/:id').post(requireAuth, RolController.getRol);

router.route('/roles/:id').delete(requireAuth, RolController.deleteRol);

router.route('/roles/:id/:permission').delete(requireAuth, RolController.deleteRolPermission);

module.exports = router;
