const _ = require('lodash');

const permissionsCheck = require('../modules/permissions-check');

const Permission = require('../models/permission');
const Rol = require('../models/rol');

/**
 * Get all roles
 * @param req
 * @param res
 * @returns void
 */
exports.getRoles = async function getRoles(req, res) {
  try {
    permissionsCheck(req.user, 'rol_index');

    const deleted = req.query.deleted || false;
    const name = new RegExp(req.query.name || '', 'i');
    const { pageNumber, configuration } = req;
    const { webpage } = configuration;
    const { amountPerPage } = webpage;

    await Rol.count({ deleted, name })
      .exec((err, totalCount) => {
        if (err) {
          next(err);
          return;
        }

        if (!totalCount) {
          return res.status(200).send({
            total_count: 0,
            count: 0,
            roles: [],
          });
        }

        const roles = Rol.find({ deleted, name })
          .limit(amountPerPage)
          .skip(amountPerPage * pageNumber)
          .populate('permissions')
          .exec(($err, roles) => {
            if ($err) {
              next($err);
              return;
            }

            res.status(200).send({
              total_count: totalCount,
              count: roles.length,
              roles,
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
 * Save a rol
 * @param req
 * @param res
 * @returns void
 */
exports.addRol = async function addRol(req, res) {
  try {
    permissionsCheck(req.user, 'rol_new');

    const { rol } = req.body;

    if (!rol.name) {
      return res.status(400).end();
    }

    await Permission.count({
      _id: {
        $in: rol.permissions,
      },
    }, (error, count) => {
      if (count > 0) {
        return res.status(403);
      }

      const newRol = new Rol(rol);
      const saved = newRol.save();

      return res.status(201).send({ rol: saved });
    });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};

/**
 * Get a single rol by slug
 * @param req
 * @param res
 * @returns void
 */
exports.getRol = async function getRol(req, res) {
  try {
    permissionsCheck(req.user, 'rol_show');

    const rol = await Rol.findOne({ name: req.params.name })
      .where('deleted').equals(false)
      .populate('permissions')
      .exec((err, rol) => {
        if (err) {
          return next(err);
        }

        if (rol == null) {
          return res.sendStatus(404);
        }

        res.status(200).send({ rol });
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

/**
 * Delete a rol by slug
 * @param req
 * @param res
 * @returns void
 */
exports.deleteRol = async function deleteRol(req, res) {
  try {
    permissionsCheck(req.user, 'rol_destroy');

    await Rol.findOneAndUpdate({ name: req.params.name }, { deleted: true })
      .exec((err, rol) => {
        if (err || rol == null) {
          res.status(422).json({ error: 'No rol was found with that id' });
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

exports.deleteRolPermission = async function deleteRolPermission(req, res) {
  try {
    permissionsCheck(req.user, 'rol_destroy');

    await Rol.findById(req.params.id)
      .exec((err, rol) => {
        if (err || rol == null) {
          res.status(422).json({ error: 'No rol was found with that id' });
          return next(err);
        }

        rol.permissions = _.remove(rol.permissions, permission => permission._id == req.permission);

        return res.status(200).json({ rol });
      });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};

exports.updateRol = async function updateRol(req, res, next) {
  try {
    permissionsCheck(req.user, 'rol_update');

    await Rol.findOneAndUpdate({ name: req.params.name }, req.body.rol)
      .exec((err, rol) => {
        if (err || rol == null) {
          res.status(422).json({ error: 'No rol was found with that id.' });
          return next(err);
        }

        return res.status(200).json({ rol });
      });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    return res.status(500).send(e);
  }
};
