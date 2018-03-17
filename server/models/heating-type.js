const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const heatingTypeSchema = new Schema({
  name: { type: String, required: 'El campo `nombre` es requerido' }
});

module.exports = mongoose.model('HeatingType', heatingTypeSchema);
