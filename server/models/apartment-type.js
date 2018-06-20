const mongoose = require('mongoose');

const { Schema } = mongoose;

const apartmentTypeSchema = new Schema({
  name: { type: String, required: 'El campo `nombre` es requerido', unique: true },
});

module.exports = mongoose.model('ApartmentType', apartmentTypeSchema);
