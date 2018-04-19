const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const secret = require('../config/secret');
const User = require('../models/user');

function generateToken(user) {
  return jwt.sign({user:user._id}, secret.secret, {
    expiresIn: 10080 // in seconds
  });
}

exports.login = function(req, res) {
  try {
    const token = generateToken(req.user);

    return res.status(200).json({
      token: `JWT ${token}`,
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.me = async function(req, res, next) {
  try {
    return res.status(200).json({user: req.user});
  } catch (e) {
    return res.status(500).send(e);
  }
};
