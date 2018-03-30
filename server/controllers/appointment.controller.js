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
    const date = Date.now();

    const appointments = await Appointment.find({
      date: date,
    }).sort('-date').exec();

    const times = timesArray();
    const newDate = Date.now();

    var freeAppointments = times.filter(each => {
      var eachTime = each.hours*100 + each.minutes;
      var nowTime = newDate.getHours()*100 + newDate.minutes;

      date.setHours(each.hours);
      date.setMinutes(each.minutes);
      date.setSeconds(0);

      return eachTime > nowTime && appointments.filter(e => e.compare(date)).length
    });

    res.status(200).json({appointments: freeAppointments});
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
    res.status(200).json({appointment});
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
