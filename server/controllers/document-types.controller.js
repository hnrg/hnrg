const DocumentType = require('../models/document-type');

/**
 * Get all documents type
 * @param req
 * @param res
 * @returns void
 */
exports.getDocumentTypes = async function getDocumentTypes(req, res) {
  try {
    const documentTypes = await DocumentType.find({})
      .exec();

    res.status(200).send({ documentTypes });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send({ error: e.message });
    }

    res.status(500).send(e);
  }
};
