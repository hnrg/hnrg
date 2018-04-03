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
  roles: [{ type: Schema.Types.ObjectId, ref: 'Rol' }],
});

userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if(err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
}

module.exports = mongoose.model('User', userSchema);
