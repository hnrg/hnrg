const {Router} = require('express');
const AppointmentController = require('../controllers/appointment.controller');

const router = Router();

// Get all Appointment
router.route('/turnos').get(AppointmentController.getAppointment);

// Get appointments by date
router.route('/turnos/:date').get(AppointmentController.getAppointment);

// Add a new Appointment
router.route('/turnos').post(AppointmentController.addAppointment);

router.route('/turnos/turnos/:document/fecha/:date/hora/:time')
        .get(AppointmentController.addAppointment)
        .post(AppointmentController.addAppointment);

// Delete a appointment by id
router.route('/turnos/:id').delete(AppointmentController.deleteAppointment);

module.exports = router;
