const {Router} = require('express');
const AppointmentController = require('../controllers/appointment.controller');

const router = Router();

// Get all Turns
router.route('/turnos').get(AppointmentController.getTurns);

// Get appointments by date
router.route('/turnos/:date').get(AppointmentController.getTurns);

// Add a new Appointment
router.route('/turnos').post(AppointmentController.addTurn);

router.route('/turnos/turnos/:document/fecha/:date/hora/:time')
        .get(AppointmentController.addTurn)
        .post(AppointmentController.addTurn);

// Delete a appointment by id
router.route('/turnos/:id').delete(AppointmentController.deleteTurn);

module.exports = router;
