const User = require('../models/user');
const Rol = require('../models/rol');

const permissionsCheck = require('../modules/permissions-check');

/**
 * Get all users
 * @param req
 * @param res
 * @returns void
 */
exports.getUsers = async function getUsers(req, res) {
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
          res.status(422).send({error: err.message});
          return;
        }

        if (!totalCount) {
          return res.status(200).send({
            total_count: 0,
            count: 0,
            users: [],
          });
        }

        User.find({ active, username })
          .limit(amountPerPage)
          .skip(amountPerPage * pageNumber)
          .populate('roles')
          .exec(($err, users) => {
            if ($err) {
              res.status(422).send({error: $err.message});
              return;
            }

            res.status(200).send({
              total_count: totalCount,
              count: users.length,
              users,
            });
          });
      });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send({error: e.message});
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
exports.getUser = async function getUser(req, res) {
  try {
    permissionsCheck(req.user, 'usuario_show');

    const user = await User.findOne({ username: req.params.username })
      .populate('roles')
      .exec((err, user) => {
        if (err) {
          res.status(422).send({error: err.message});
          return;
        }

        if (user == null) {
          return res.sendStatus(404);
        }

        res.status(200).send({ user });
      });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send({error: e.message});
    }

    return res.status(500).send(e);
  }
};

exports.addUser = async function addUser(req, res) {
  try {
    permissionsCheck(req.user, 'usuario_new');

    const { user } = req.body;
    const {
      email, username, firstName, lastName, password,
    } = user;

    if (!email) {
      return res.status(422).send({ error: 'Debe ingresar un email' });
    }

    if (!username) {
      return res.status(422).send({ error: 'Debe ingresar un nombre de usuario' });
    }

    if (!password) {
      return res.status(422).send({ error: 'Debe ingresar una contraseña' });
    }

    User.findOne({
      email,
    }, (err, existingUser) => {
      if (err) {
        res.status(422).send({error: err.message});
        return;
      }

      if (existingUser) {
        return res.status(422).send({ error: 'El mail que seleccionó ya se encuentra en uso' });
      }

      User.findOne({
        username,
      }, ($err, $existingUser) => {
        if ($err) {
          res.status(422).send({error: $err.message});
          return;
        }

        if ($existingUser) {
          return res.status(422).send({ error: 'That username is already in use.' });
        }

        const newUser = new User({
          ...user,
          active: true,
        });

        newUser.save(($$err, saved) => {
          if ($$err) {
            res.status(422).send({error: $$err.message});
            return;
          }

          res.status(201).send({ user: saved });
        });
      });
    });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send({error: e.message});
    }

    return res.status(500).send(e);
  }
};

exports.deleteUser = async function deleteUser(req, res) {
  try {
    permissionsCheck(req.user, 'usuario_index');

    await User.findOneAndUpdate({ username: req.params.username }, { active: false, roles: [] })
      .exec((err, user) => {
        if (err || user == null) {
          res.status(422).json({ error: 'No se encontró ningún usuario con ese id' });
          return;
        }

        return res.status(200).end();
      });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send({error: e.message});
    }

    if (e.name === 'CastError') {
      return res.sendStatus(400);
    }

    return res.status(500).send(e);
  }
};

exports.updateUser = async function updateUser(req, res) {
  try {
    permissionsCheck(req.user, 'usuario_update');

    var data = {};

    await Rol.find({
      name: {
        $in: req.body.user.roles
      }
    }).exec((err, roles) => {
      if (req.body.user.roles && !roles) {
        return res.status(403);
      }

      if (err) {
        res.status(422).send({error: err.message});
        return;
      }

      data = req.body.user;

      if (req.body.user.roles) { data.roles = roles.map(r => r._id); }

      User.findOneAndUpdate({ username: req.params.username }, data)
        .exec((err, user) => {
          if (err || user == null) {
            res.status(422).json({ error: 'No se encontró ningún user con ese id' });
            return;
          }

          return res.status(200).json({ user });
        });
    });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send({error: e.message});
    }

    return res.status(500).send(e);
  }
};
