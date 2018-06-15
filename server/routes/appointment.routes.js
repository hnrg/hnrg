const { Router } = require('express');
const AppointmentController = require('../controllers/appointment.controller');
const configurationMiddleware = require('../modules/middleware/configuration');

const router = Router();

// Get all Appointment
router.route('/turnos')
  .get(configurationMiddleware, AppointmentController.getAppointments);

// Get appointments by date
router.route('/turnos/:date')
  .get(configurationMiddleware, AppointmentController.getAppointments);

// Add a new Appointment
router.route('/turnos')
  .post(configurationMiddleware, AppointmentController.addAppointment);

router.route('/turnos/:documentNumber/fecha/:date/hora/:time')
  .get(configurationMiddleware, AppointmentController.addAppointment);

// Delete a appointment by id
router.route('/turnos/:id')
  .delete(configurationMiddleware, AppointmentController.deleteAppointment);

module.exports = router;

