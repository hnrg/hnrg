const Permission = require('../models/permission');
const User = require('../models/user');

const permissionsCheck = require('../modules/permissions-check');

/**
 * Get all users
 * @param req
 * @param res
 * @returns void
 */
exports.getUsers = async function(req, res) {
  try {
    permissionsCheck(req.user, 'usuario_index');

    const users = await User.find({}).populate('roles').exec();

    res.status(200).send({users});
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};

/**
 * Get a single user by slug
 * @param req
 * @param res
 * @returns void
 */
exports.getUser = async function(req, res, next) {
  try {
    permissionsCheck(req.user, 'usuario_show');

    const user = await User.findById(req.params.id).populate('roles').exec();

    if (!user) {
      return res.sendStatus(404);
    }

    res.status(200).send({user});
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    return res.status(500).send(e);
  }
};

exports.addUser = async function(req, res) {
  try {
    permissionsCheck(req.user, 'usuario_new');

    const user = req.body.user;

    const email = user.email;
    const username = user.username;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const password = user.password;

    if (!email) {
      return res.status(422).send({error: 'You must enter an email address.'});
    }

    if (!username) {
      return res.status(422).send({error: 'You must enter a username'});
    }

    if (!firstName || !lastName) {
      return res.status(422).send({error: 'You must enter your full name.'});
    }

    if (!password) {
      return res.status(422).send({error: 'You must enter a password.'});
    }

    User.findOne({
      email: email
    }, function(err, existingUser) {
      if (err) {
        return next(err);
      }

      if (existingUser) {
        return res.status(422).send({error: 'That email address is already in use.'});
      }

      User.find({
        username: username
      }, function(err, existingUser) {
        if (err) {
          return next(err);
        }

        if (existingUser) {
          return res.status(422).send({error: 'That username is already in use.'});
        }

        const newUser = new User(user);

        newUser.save(function(err, user) {
          if (err) {
            return next(err);
          }

          res.status(201).send({user});
        });
      });
    });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    return res.status(500).send(e);
  }
};

exports.deleteUser = async function(req, res) {
  try {
    permissionsCheck(req.user, 'usuario_index');

    const user = await User.findOne({id: req.params.id}).exec();

    if (!user) {
      return res.sendStatus(404);
    }

    await user.remove();
    res.sendStatus(200);
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    if (e.name === 'CastError') {
      return res.sendStatus(400);
    }

    return res.status(500).send(e);
  }
};
