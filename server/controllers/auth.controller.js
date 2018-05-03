const jwt = require('jsonwebtoken');

const secret = require('../config/secret');

function generateToken(user) {
  return jwt.sign({ user: user._id }, secret.secret, {
    expiresIn: 10080, // in seconds
  });
}

exports.loginAction = function loginAction(req, res) {
  try {
    const token = generateToken(req.user);

    return res.status(200).json({
      token: `JWT ${token}`,
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getProfileAction = async function getProfileAction(req, res) {
  try {
    return res.status(200).json({ user: req.user });
  } catch (e) {
    return res.status(500).send(e);
  }
};
