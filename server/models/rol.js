const mongoose = require('mongoose');

const { Schema } = mongoose;

const Permission = require('./permission');

const rolSchema = new Schema({
  name: { type: String, required: 'El campo `nombre` es requerido', unique: true },
  deleted: { type: Boolean, default: false },
  permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
});

module.exports = mongoose.model('Rol', rolSchema);
