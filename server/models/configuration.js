const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = require('./user');

const configurationSchema = new Schema({
  webpage: {
    name: { type: String, required: 'El campo `nombre` es requerido' },
    amountPerPage: { type: Number },
    email: { type: String, required: 'El campo `email` es requerido' },
    description: { type: String },
  },
  appointments: {
    from: { type: Date },
    delta: { type: Number },
    ammount: { type: Number },
  },
  maintenance: { type: Boolean },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Configuration', configurationSchema);
