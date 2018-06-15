const { Router } = require('express');

const configurationMiddleware = require('../modules/middleware/configuration');
const HeatingTypeController = require('../controllers/heating-type.controller');

const router = Router();

router.route('/heating-types').get(configurationMiddleware, HeatingTypeController.getHeatingTypes);

module.exports = router;

