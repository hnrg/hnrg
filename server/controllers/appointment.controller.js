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
        $lt: moment(new Date).add(1, 'days').toDate(),
      },
    }).exec();

    const times = timesArray();
    const currentTime = totalTime(moment());

    var freeAppointments = times.filter(each => {
      let eachTime = totalTime(each);

      date
        .hours(each.hours())
        .minutes(each.minutes())
        .seconds(each.seconds());

      return (eachTime > currentTime) && !appointments.find(e => {
        return date.isSame(e, 'hours')
            && date.isSame(e, 'minutes')
            && date.isSame(e, 'seconds');
      });
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
