const {Router} = require('express');
const TurnController = require('../controllers/turn.controller');

const router = Router();

// Get all Turns
router.route('/turnos').get(TurnController.getTurns);

// Get turns by date
router.route('/turnos/:date').get(TurnController.getTurns);

// Add a new Turn
router.route('/turnos').post(TurnController.addTurn);

router.route('/turnos/turnos/:document/fecha/:date/hora/:time')
        .get(TurnController.addTurn)
        .post(TurnController.addTurn);

// Delete a turn by id
router.route('/turnos/:id').delete(TurnController.deleteTurn);

module.exports = router;
