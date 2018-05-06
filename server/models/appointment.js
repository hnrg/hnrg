const mongoose = require('mongoose');

const { Schema } = mongoose;

const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: 'El campo `fecha` es requerido',
    unique: true,
  },
  documentNumber: {
    type: Number,
    required: 'El campo `número de documento` es requerido',
  },
  chatId: { type: Number },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
