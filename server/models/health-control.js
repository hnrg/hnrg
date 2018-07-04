const mongoose = require('mongoose');

const { Schema } = mongoose;

require('./patient');
require('./user');

const healthControlSchema = new Schema({
  date: {
    type: Date,
    required: 'El campo `fecha` es requerido',
  },
  weight: {
    type: Schema.Types.Decimal128,
    required: 'El campo `peso` es requerido',
  },
  pc: {
    type: Schema.Types.Decimal128,
    required: 'El campo `pc` es requerido',
  },
  ppc: {
    type: Schema.Types.Decimal128,
    required: 'El campo `ppc` es requerido',
  },
  height: {
    type: Schema.Types.Decimal128,
    require: 'El campo `talla` es requerido',
  },
  completeVaccines: {
    type: Boolean,
    default: false,
  },
  vaccinesObservations: { type: String },
  accordingMaturationContext: {
    type: Boolean,
    default: false,
  },
  maturationObservations: { type: String },
  commonPhysicalExamination: {
    type: Boolean,
    default: false,
  },
  physicalExaminationObservations: { type: String },
  feeding: { type: String },
  generalObservations: { type: String },
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: 'El campo `paciente` es requerido',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'El campo `user` es requerido',
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('HealthControl', healthControlSchema);
