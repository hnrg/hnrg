const { Router } = require('express');

const configurationMiddleware = require('../modules/middleware/configuration');
const DocumentTypesController = require('../controllers/document-types.controller');

const router = Router();

router.route('/document-types').get(configurationMiddleware, DocumentTypesController.getDocumentTypes);

module.exports = router;
