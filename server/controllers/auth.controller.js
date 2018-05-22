const jwt = require('jsonwebtoken');

const secret = require('../config/secret');
const User = require('../models/user');

function generateToken(user) {
  return jwt.sign({ user: user._id }, secret.secret, {
    expiresIn: 10080, // in seconds
  });
}

exports.loginAction = function loginAction(req, res) {
  try {
    const token = generateToken(req.user);

    res.status(200).json({
      token: `JWT ${token}`,
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getProfileAction = async function getProfileAction(req, res) {
  try {
    res.status(200).json({ user: req.user });
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.updateProfileAction = async function updateProfileAction(req, res) {
  try {
    const { user } = req;
    
    User.findByIdAndUpdate(user._id, req.body.user)
      .exec((err, updatedUser) => {
        if (err) {
          return res.status(422).end();
        }

        if (!updatedUser) {
          return res.status(404).end();
        }

        res.status(201).send({ user: updatedUser });
      });
  } catch (e) {
    res.status(500).send(e);
  }
};
