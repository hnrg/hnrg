const moment = require('moment-timezone');

const Appointment = require('../models/appointment');

/**
 * Return an array with all the available times
 * @returns array
 */
function timesArray(date, from = 0, delta = 30, amount = 48) {
  const times = [];

  times.push(moment(date).hours(from).minutes(0).seconds(0));

  for (let i = 1; i < amount; i += 1) {
    times.push(moment(times[i - 1]).add(delta, 'minutes'));
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
    const { appointments } = req.configuration;
    const { from, delta, amount } = appointments;

    if (date.isBefore(moment().startOf('day'))) {
      return res.status(204).json({ availables: [] });
    }

    const times = timesArray(date, from, delta, amount);
    const currentTime = totalTime(moment());

    const availablesAppointments = await Appointment.find({
      date: {
        $gte: moment(date).startOf('day').toDate(),
        $lt: moment(date).add(1, 'days').toDate(),
      },
    }, 'date').exec();

    const availables = times.filter(each => (totalTime(each) > currentTime || !date.isSame(moment(), 'day'))
          && !timeInArray(mergeTime(date, each), availablesAppointments.map(e => e.date))).map(e => e.format('HH:mm:ss'));

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
    const { appointments } = req.configuration;
    const { from, delta, amount } = appointments;

    if (!documentNumber || !date || !time) {
      return res.status(400).end();
    }

    const newDate = moment(`${date} ${time}`);

    if (!(newDate.isValid() && timeInArray(newDate, timesArray(from, delta, amount)))) {
      return res.status(400).send({ error: 'Debe ingresar fecha y horario validos' });
    }

    await Appointment
      .count({ date: newDate.toDate() })
      .exec((err, count) => {
        if (err) {
          res.status(422).send({ error: err.message });
          return;
        }

        if (count > 0) {
          return res.status(422).send({ error: 'El horario ingresado corresponde a un turno registrado' });
        }
        const newAppointment = new Appointment({
          documentNumber,
          date: newDate.toDate(),
        });

        const saved = newAppointment.save();
        res.status(201).json({
          appointment: {
            documentNumber: saved.documentNumber,
            date: saved.date,
          },
        });
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
