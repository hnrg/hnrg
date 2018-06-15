const { Router } = require('express');

const configurationMiddleware = require('../modules/middleware/configuration');
const WaterTypeController = require('../controllers/water-type.controller');

const router = Router();

router.route('/water-types').get(configurationMiddleware, WaterTypeController.getWaterTypes);

module.exports = router;

