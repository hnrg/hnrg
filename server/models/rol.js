const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Permission = require('./permission');

const rolSchema = new Schema({
  name: { type: String, required: 'El campo `nombre` es requerido' },
  permission: [{ type: Schema.Types.ObjectId, ref: Permission }],
});

module.exports = mongoose.model('Rol', rolSchema);
