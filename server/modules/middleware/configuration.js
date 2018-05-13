const Configuration = require('../../models/configuration');

module.exports = async function configurationMiddleware(req, res, next) {
  try {
    await Configuration.findOne({})
      .exec((err, configuration) => {
        req.configuration = configuration;
        next();
      });
  } catch (e) {
    res.status(500).send(e);
  }
};
