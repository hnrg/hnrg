const { Router } = require('express');

const configurationMiddleware = require('../modules/middleware/configuration');
const ApartamentTypeController = require('../controllers/apartament-type.controller');

const router = Router();

router.route('/apartament-types').get(configurationMiddleware, ApartamentTypeController.getApartamentTypes);

module.exports = router;

