const Permission = require('../models/permission');
const User = require('../models/user');

/**
 * Get all users
 * @param req
 * @param res
 * @returns void
 */
exports.getUsers = async function(req, res) {
  try {
    const users = await User.find({}).populate('roles').exec();

    res.status(200).send({users});
  } catch (e) {
    res.status(500).send(e);
  }
};

/**
 * Get a single user by slug
 * @param req
 * @param res
 * @returns void
 */
exports.getUser = async function(req, res) {
  try {
    console.log(req.params);
    const user = await User.findById(req.params.id).exec();

    if (!user) {
      return res.sendStatus(404);
    }

    res.status(200).json({user});
  } catch (e) {
    return res.status(500).send(e);
  }
};
