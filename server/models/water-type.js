const mongoose = require('mongoose');

const { Schema } = mongoose;

const waterTypeSchema = new Schema({
  name: { type: String, required: 'El campo `nombre` es requerido', unique: true },
});

module.exports = mongoose.model('WaterType', waterTypeSchema);
