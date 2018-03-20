const Appointment = require('../models/appointment');
const slug = require('limax');

/**
 * Get all appointment
 * @param req
 * @param res
 * @returns void
 */
exports.getAppointments = async function getAppointments(req, res) {
  try {
    const appointment = await Appointment.find(req.params.date && {
      date: req.params.date
    }).sort('-date -time').exec();

    res.status(200).json({appointments});
  } catch (e) {
    return res.status(500).send(e);
  }
};

/**
 * Save a appointment
 * @param req
 * @param res
 * @returns void
 */
exports.addAppointment = async function addAppointment(req, res) {
  try {
    if (!req.body.appointment.documentNumber || !req.body.appointment.date) {
      return res.status(403).end();
    }

    const newAppointment = new Appointment(req.body.appointment);
    const saved = await newAppointment.save();
    res.status(201).json({turn: saved});
  } catch (e) {
    return res.status(500).send(e);
  }
};

/**
 * Get a single appointment by slug
 * @param req
 * @param res
 * @returns void
 */
exports.getAppointment = async function getAppointment(req, res) {
  try {
    const appointment = await Appointment.findOne({id: req.params.id}).exec();
    if (!appointment) {
      return res.sendStatus(404);
    }
    res.status(200).json({turn});
  } catch (e) {
    if (e.name === 'CastError') {
      return res.sendStatus(400);
    }
    return res.status(500).send(e);
  }
};

/**
 * Delete a appointment by slug
 * @param req
 * @param res
 * @returns void
 */
exports.deleteAppointment = async function deleteAppointment(req, res) {
  try {
    const appointment = await Appointment.findOne({id: req.params.id}).exec();
    if (!appointment) {
      return res.sendStatus(404);
    }

    await appointment.remove();
    res.sendStatus(200);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.sendStatus(400);
    }
    return res.status(500).send(e);
  }
};
