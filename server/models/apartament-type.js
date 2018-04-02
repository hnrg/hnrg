const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apartamentTypeSchema = new Schema({
  name: { type: String, required: 'El campo `nombre` es requerido', unique: true },
});

module.exports = mongoose.model('ApartamentType', apartamentTypeSchema);
