const { Router } = require('express');

const configurationMiddleware = require('../modules/middleware/configuration');
const MedicalInsuranceController = require('../controllers/medical-insurance.controller');

const router = Router();

router.route('/medical-insurances').get(configurationMiddleware, MedicalInsuranceController.getMedicalInsurances);

module.exports = router;

