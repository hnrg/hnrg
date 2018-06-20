const { Router } = require('express');

const configurationMiddleware = require('../modules/middleware/configuration');
const ApartmentTypeController = require('../controllers/apartment-type.controller');

const router = Router();

router.route('/apartment-types').get(configurationMiddleware, ApartmentTypeController.getApartmentTypes);

module.exports = router;

