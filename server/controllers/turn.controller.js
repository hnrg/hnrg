const Turn = require('../models/turn');
const slug = require('limax');

/**
 * Get all turns
 * @param req
 * @param res
 * @returns void
 */
exports.getTurns = async function getTurns(req, res) {
  try {
    const turns = await Turn.find(!req.params.date? : {
      date: req.params.date
    }).sort('-date -time').exec();

    res.status(200).json({turns});
  } catch (e) {
    return res.status(500).send(e);
  }
};

/**
 * Save a turn
 * @param req
 * @param res
 * @returns void
 */
exports.addTurn = async function addTurn(req, res) {
  try {
    if (!req.body.turn.documentNumber || !req.body.turn.date) {
      return res.status(403).end();
    }

    const newTurn = new Turn(req.body.turn);
    const saved = await newTurn.save();
    res.status(201).json({turn: saved});
  } catch (e) {
    return res.status(500).send(e);
  }
};

/**
 * Get a single turn by slug
 * @param req
 * @param res
 * @returns void
 */
exports.getTurn = async function getTurn(req, res) {
  try {
    const turn = await Turn.findOne({id: req.params.id}).exec();
    if (!turn) {
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
 * Delete a turn by slug
 * @param req
 * @param res
 * @returns void
 */
exports.deleteTurn = async function deleteTurn(req, res) {
  try {
    const turn = await Turn.findOne({id: req.params.id}).exec();
    if (!turn) {
      return res.sendStatus(404);
    }
    await turn.remove();
    res.sendStatus(200);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.sendStatus(400);
    }
    return res.status(500).send(e);
  }
};
