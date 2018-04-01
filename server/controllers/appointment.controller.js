const moment = require('moment-timezone');
const slug = require('limax');

const Appointment = require('../models/appointment');

/**
 * Return an array with all the available times
 * @returns array
 */
const timesArray = function(start = 0, end = 24, delta = 30) {
  var times = [];

  for (let i = start; i < end; i++) {
    for (let j = 0; j < 60/delta; j++) {
      let k = j * delta;

      times.push(moment()
        .hours(i)
        .minutes(k)
        .seconds(0)
      );
    }
  }

  return times;
}


/**
 * Return an array with all the available times
 * @returns array
 */
const stringTimesArray = () => timesArray().map(each => each.format("HH:mm:ss"));


const totalTime = date => {
  return date.hours()*10000 + date.minutes()*100 + date.seconds();
};

const dateInArray = (date, times) => {
  return times.find(each => {
    return date.isSame(moment(each), 'hours')
        && date.isSame(moment(each), 'minutes')
        && date.isSame(moment(each), 'seconds');
  })
};

const mergeTime = (src, dest) => {
  return dest.hours(src.hours()).minutes(src.minutes()).seconds(src.seconds())
};

/**
 * Get all appointment
 * @param req
 * @param res
 * @returns void
 */
exports.getAppointments = async function(req, res) {
  try {
    var date = moment(req.params.date);

    const appointments = await Appointment.find({
      date: {
        $gte: moment().startOf('day').toDate(),
        $lt: moment().add(1, 'days').toDate(),
      },
    }).exec();

    const times = timesArray();
    const currentTime = totalTime(moment());

    var freeAppointments = times.filter(each => {
      let eachTime = totalTime(each);

      return eachTime > currentTime
          && !dateInArray(mergeTime(each, date), appointments.map(e => e.date));
    }).map(each => each.format("HH:mm:ss"));

    res.status(200).json({appointments: freeAppointments});
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
exports.addAppointment = async function(req, res) {
  try {
    if (!req.body.appointment.documentNumber || !req.body.appointment.date) {
      return res.status(403).end();
    }

    var appointment = {documentNumber, date} = req.body.appointment;
    appointment.date = moment(appointment.date).toDate();

    const newAppointment = new Appointment(appointment);
    const saved = await newAppointment.save();
    res.status(201).json({appointment: saved});
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
exports.addAppointmentWithParams = async function(req, res) {
  try {
    const params = req.params;

    if (!params.document || !params.date || !params.time) {
      return res.status(403).end();
    }

    var date = moment(`${params.date} ${params.time}`, "yyyy-MM-dd HH:mm:ss");

    if (!date.isValid()) {
      return res.status(403).end();
    }

    const newAppointment = new Appointment({
      documentNumber: params.document,
      date: date.toDate()
    });

    const saved = await newAppointment.save();
    res.status(201).json({appointment: saved});
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
exports.getAppointment = async function(req, res) {
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
 * Delete an appointment by slug
 * @param req
 * @param res
 * @returns void
 */
exports.deleteAppointment = async function(req, res) {
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
