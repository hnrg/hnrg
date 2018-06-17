const _ = require('lodash');

const permissionsCheck = require('../modules/permissions-check');

const Permission = require('../models/permission');
const Rol = require('../models/rol');
const User = require('../models/user');

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
          throw (err);
        }

        if (!totalCount) {
          return res.status(200).send({
            total_count: 0,
            count: 0,
            roles: [],
          });
        }

        Rol.find({ deleted, name })
          .limit(amountPerPage)
          .skip(amountPerPage * pageNumber)
          .populate('permissions')
          .exec(($err, roles) => {
            if ($err) {
              throw ($err);
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

    await Permission.find({
      name: {
        $in: rol.permissions,
      },
    }, (error, permissions) => {
      if (!permissions) {
        return res.status(403);
      }

      const newRol = new Rol({
        name: rol.name,
        permissions: permissions.map(p => p._id),
      });
      newRol.save(($err, saved) => {
        if ($err) {
          throw ($err);
        }

        res.status(201).send({ rol: saved });
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
          throw (err);
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

    await Rol.findOne({ name: req.params.name })
      .exec((err, rol) => {
        if (err || rol == null) {
          res.status(422).json({ error: 'No rol was found with that name' });
          return;
        }

        User.count({
          active: true,
          roles: {
            $elemMatch: {
              $in: [rol._id]
            }
          },
        })
        .exec(($err, count) => {
          if ($err) {
            throw ($err);
          }

          if (count > 0) {
            res.status(422).json({ error: 'No se puede borrar el rol ya que existen usuarios que lo tienen' });
            return;
          }

          rol.deleted = true;
          rol.save(($$err, saved) => {
            if ($$err) {
              throw ($$err);
            }
            res.status(200).end();
          });
        });
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

    await Rol.findOne({ name: req.params.name })
      .populate('permissions')
      .exec((err, rol) => {
        if (err || rol == null) {
          res.status(422).json({ error: 'No rol was found with that name' });
          return;
        }

        rol.permissions = rol.permissions.filter(permission => permission.name !== req.params.permission);

        rol.save(($err, updated) => {
          if ($err) {
            throw ($err);
          }

          res.status(200).json({ rol: updated });
        });
      });
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};

exports.updateRol = async function updateRol(req, res) {
  try {
    permissionsCheck(req.user, 'rol_update');

    await Rol.findOneAndUpdate({ name: req.params.name }, req.body.rol)
      .exec((err, rol) => {
        if (err || rol == null) {
          res.status(422).json({ error: 'No rol was found with that id.' });
          return;
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
