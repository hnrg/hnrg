const Configuration = require('../../models/configuration');

module.exports = async function configurationMiddleware(req, res, next) {
  try {
    await Configuration.findOne({})
      .exec((err, configuration) => {
        req.configuration = configuration;
        req.pageNumber = req.query.pageNumber || 1;
        next();
      });
  } catch (e) {
    res.status(500).send(e);
  }
};
