const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const secret = require('../secret');
const User = require('../models/user');

function generateToken(user) {
  return jwt.sign({user:user}, secret.secret, {
    expiresIn: 10080 // in seconds
  });
}

exports.login = function(req, res, next) {
  try {
    const token = generateToken(req.user);

    return res.status(200).json({
      token: `JWT ${token}`,
      user: req.user
    });
  } catch (e) {
    res.status(500).send(e);
  }
}
