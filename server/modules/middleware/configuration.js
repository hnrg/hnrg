const Configuration = require('../../models/configuration');

module.exports = async function configurationMiddleware(req, res, next) {
  try {
    await Configuration.findOne({})
      .sort('-updatedAt')
      .exec((err, configuration) => {
        req.configuration = configuration;
        req.pageNumber = req.query.pageNumber || 0;
        next();
      });
  } catch (e) {
    res.status(500).send(e);
  }
};
