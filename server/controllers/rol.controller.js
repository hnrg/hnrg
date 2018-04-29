const Permission = require('../models/permission');
const Rol = require('../models/rol');
const mongoose = require('mongoose');

const permissionsCheck = require('../modules/permissions-check');

/**
 * Get all roles
 * @param req
 * @param res
 * @returns void
 */
exports.getRoles = async function(req, res) {
  try {
    permissionsCheck(req.user, 'rol_index');

    const roles = await Rol.find({}).populate('permissions').exec();

    res.status(200).send({roles});
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
exports.addRol = async function(req, res) {
  try {
    permissionsCheck(req.user, 'rol_new');

    const {rol} = req.body;

    if (!rol.name) {
      return res.status(403).end();
    }

    await Permission.count({
      _id: {
        $in: rol.permissions,
      }
    }, (error, count) => {
      if (count > 0) {
        return res.status(403);
      }

      const newRol = new Rol(rol);
      const saved = newRol.save();

      return res.status(200).send({rol: saved});
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
exports.getRol = async function(req, res) {
  try {
    permissionsCheck(req.user, 'rol_show');

    const rol = await Rol.findById(req.params.id).populate('permissions').exec();

    if (!rol) {
      return res.sendStatus(404);
    }

    res.status(200).send({rol});
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
exports.deleteRol = async function(req, res) {
  try {
    permissionsCheck(req.user, 'rol_delete');

    const rol = await Rol.findById(req.params.id).exec();

    if (!rol) {
      return res.sendStatus(404);
    }

    await rol.remove();
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

exports.deleteRolPermission = async function(req, res) {
  try {
    permissionsCheck(req.user, 'rol_delete');

  } catch (e) {
    if (e.name === 'NotAllowedError') {
      return res.status(403).send(e);
    }

    res.status(500).send(e);
  }
};
