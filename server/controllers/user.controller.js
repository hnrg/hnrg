const User = require('../models/user');

const permissionsCheck = require('../modules/permissions-check');

/**
 * Get all users
 * @param req
 * @param res
 * @returns void
 */
exports.getUsers = async function getUsers(req, res, next) {
  try {
    permissionsCheck(req.user, 'usuario_index');

    const active = req.query.active || true;
    const username = new RegExp(req.query.username || '', 'i');
    const { pageNumber, configuration } = req;
    const { webpage } = configuration;
    const { amountPerPage } = webpage;

    await User.count({ active, username })
      .exec((err, totalCount) => {
        if (err) {
          next(err);
          return;
        }

        if (!totalCount) {
          return res.status(200).send({
            "total_count": 0,
            count: 0,
            users: [],
          });
        }

        const users = User.find({ active, username })
          .limit(amountPerPage)
          .skip(amountPerPage * pageNumber)
          .populate('roles')
          .exec(($err, users) => {
            if ($err) {
              next($err);
              return;
            }

            res.status(200).send({
              "total_count": totalCount,
              count: users.length,
              users,
            });
          });
      });
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
exports.getUser = async function getUser(req, res, next) {
  try {
    permissionsCheck(req.user, 'usuario_show');

    const user = await User.findOne({ username: req.params.username })
      .where('active').equals(true)
      .populate('roles')
      .exec((err, user) => {
        if (err) {
          return next(err);
        }

        if (user == null) {
          return res.sendStatus(404);
        }

        res.status(200).send({ user });
      });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    return res.status(500).send(e);
  }
};

exports.addUser = async function addUser(req, res, next) {
  try {
    permissionsCheck(req.user, 'usuario_new');

    const { user } = req.body;
    const {
      email, username, firstName, lastName, password,
    } = user;

    if (!email) {
      return res.status(422).send({ error: 'You must enter an email address.' });
    }

    if (!username) {
      return res.status(422).send({ error: 'You must enter a username' });
    }

    if (!firstName || !lastName) {
      return res.status(422).send({ error: 'You must enter your full name.' });
    }

    if (!password) {
      return res.status(422).send({ error: 'You must enter a password.' });
    }

    User.findOne({
      email,
    }, (err, existingUser) => {
      if (err) {
        return next(err);
      }

      if (existingUser) {
        return res.status(422).send({ error: 'That email address is already in use.' });
      }

      User.find({
        username,
      }, ($err, $existingUser) => {
        if ($err) {
          return next($err);
        }

        if ($existingUser) {
          return res.status(422).send({ error: 'That username is already in use.' });
        }

        const newUser = new User(user);

        newUser.save(($$err, newUserData) => {
          if ($$err) {
            return next($$err);
          }

          res.status(201).send({ newUserData });
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

exports.deleteUser = async function deleteUser(req, res) {
  try {
    permissionsCheck(req.user, 'usuario_index');

    await User.findOneAndUpdate({ username: req.params.username }, { active: false })
      .exec((err, user) => {
        if (err || user == null) {
          res.status(422).json({ error: 'No user was found with that id' });
          return next(err);
        }

        return res.status(200).end();
      });
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

exports.updateUser = async function updateUser(req, res, next) {
  try {
    permissionsCheck(req.user, 'usuario_update');

    await User.findOneAndUpdate({ username: req.params.username }, req.body.user)
      .exec((err, user) => {
        if (err || user == null) {
          res.status(422).json({ error: 'No user was found with that id.' });
          return next(err);
        }

        return res.status(200).json({ user });
      });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    return res.status(500).send(e);
  }
};
