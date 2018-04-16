const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user');

const configurationSchema = new Schema({
  webpage: {
    name: { type: String, required: 'El campo `nombre` es requerido' },
    amountPerPage: { type: Number },
    email: { type: String, required: 'El campo `email` es requerido' },
    description: { type: String },
  },
  appintments: {
    range: {
      from: { type: Date },
      to: { type: Date },
    },
    delta: { type: Number },
  },
  maintenance: { type: Boolean },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true
});

module.exports = mongoose.model('Configuration', configurationSchema);
