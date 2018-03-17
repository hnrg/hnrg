const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const Rol = require('./rol');

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'El campo `email` es requerido',
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Ingrese un email valido - ejemplo@dominio.com'
    ]
  },
  username: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'El campo `nombre de usuario` es requerido',
    match: [
      /\w+/,
      'Un nombre de usuario solo puede contener letras y guiones bajos'
    ],
  },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  password: {
    type: String,
    required: 'El campo `contraseña` es requerido',
    match: [
      /\S+/,
      'Una contraseña no puede tener espacios blancos'
    ]
  },
  active: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  roles: [{ type: Schema.Types.ObjectId, ref: Rol }],
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
