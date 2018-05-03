const moment = require('moment-timezone');

const Appointment = require('../models/appointment');

/**
 * Return an array with all the available times
 * @returns array
 */
function timesArray(date, start = 0, end = 24, delta = 30) {
  const times = [];

  for (let i = start; i < end; i += 1) {
    for (let j = 0; j < 60 / delta; j += 1) {
      const k = j * delta;

      times.push(moment(date)
        .hours(i)
        .minutes(k)
        .seconds(0));
    }
  }

  return times;
}

const totalTime = date => ((date.hours() * 10000) + (date.minutes() * 100) + date.seconds());

const timeInArray = (date, times) => times.find(each => date.isSame(moment(each), 'hours')
        && date.isSame(moment(each), 'minutes')
        && date.isSame(moment(each), 'seconds'));

const mergeTime = (dest, src) => moment(dest)
  .hours(src.hours())
  .minutes(src.minutes())
  .seconds(src.seconds());

/**
 * Get all appointment
 * @param req
 * @param res
 * @returns void
 */
exports.getAppointments = async function getAppointments(req, res) {
  try {
    const date = moment(req.params.date);

    if (date.isBefore(moment().startOf('day'))) {
      return res.status(204).json({ appointments: [] });
    }

    const times = timesArray(date);
    const currentTime = totalTime(moment());

    const appointments = await Appointment.find({
      date: {
        $gte: moment(date).startOf('day').toDate(),
        $lt: moment(date).add(1, 'days').toDate(),
      },
    }, 'date').exec();

    const availables = times.filter(each => (totalTime(each) > currentTime || !date.isSame(moment(), 'day'))
          && !timeInArray(mergeTime(date, each), appointments)).map(each => each.format('HH:mm:ss'));

    res.status(200).json({ availables });
  } catch (e) {
    return res.status(500).send(e);
  }
};

/**
 * Save an appointment
 * @param req
 * @param res
 * @returns void
 */
exports.addAppointment = async function addAppointment(req, res) {
  try {
    const { documentNumber, date, time } = req.body.appointment || req.params;

    if (!documentNumber || !date || !time) {
      return res.status(403).end();
    }

    const newDate = moment(`${date} ${time}`);

    if (!newDate.isValid()) {
      return res.status(403).end();
    }

    const newAppointment = new Appointment({
      documentNumber,
      date: newDate.toDate(),
    });

    const saved = await newAppointment.save();
    res.status(201).json({
      appointment: {
        documentNumber: saved.documentNumber,
        date: saved.date,
      },
    });
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
    const appointment = await Appointment.findById(req.params.id).exec();
    if (!appointment) {
      return res.sendStatus(404);
    }
    res.status(200).json({ appointment });
  } catch (e) {
    if (e.name === 'CastError') {
      return res.sendStatus(400);
    }
    return res.status(500).send(e);
  }
};

/**
 * Delete an appointment by slug
 * @param req
 * @param res
 * @returns void
 */
exports.deleteAppointment = async function deleteAppointment(req, res) {
  try {
    const appointment = await Appointment.findById(req.params.id).exec();
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
