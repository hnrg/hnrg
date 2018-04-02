const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentTypeSchema = new Schema({
  name: { type: String, required: 'El campo `nombre` es requerido', unique: true },
});

module.exports = mongoose.model('DocumentType', documentTypeSchema);
