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

    User.findById(user._id)
      .exec((err, user) => {
        if (err) {
          res.status(422).send({error: err.message});
          return;
        }

        Object.keys(req.body.user).forEach((key) => {
          user[key] = req.body.user[key];
        });

        user.save(($err, updated) => {
          if ($err) {
            res.status(422).send({error: $err.message});
            return;
          }

          return res.status(200).send({ user: updated });
        });
      });
  } catch (e) {
    res.status(500).send(e);
  }
};
