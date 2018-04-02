const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicalInsuranceSchema = new Schema({
  name: { type: String, required: 'El campo `nombre` es requerido', unique: true },
});

module.exports = mongoose.model('MedicalInsurance', medicalInsuranceSchema);
