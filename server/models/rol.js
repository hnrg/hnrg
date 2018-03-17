const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolSchema = new Schema({
  name: { type: String, required: 'El campo `nombre` es requerido' },
  permissionId: { type: [Schema.Types.ObjectId] },
});

module.exports = mongoose.model('Rol', rolSchema);
