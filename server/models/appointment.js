const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: 'El campo `fecha` es requerido'
  },
  documentNumber: {
    type: Number,
    required: 'El campo `número de documento` es requerido'
  },
  chatId: { type: Number },
});

module.exports = mongoose.model('Turn', appointmentSchema);
