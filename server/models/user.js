

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const Rol = require('./rol');

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'El campo `email` es requerido',
    match: [
      /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/,
      'Ingrese un email valido - ejemplo@dominio.com',
    ],
  },
  username: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'El campo `nombre de usuario` es requerido',
    match: [
      /\w+/,
      'Un nombre de usuario solo puede contener letras y guiones bajos',
    ],
  },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  password: {
    type: String,
    required: 'El campo `contraseña` es requerido',
    match: [
      /\S+/,
      'Una contraseña no puede tener espacios blancos',
    ],
  },
  active: { type: Boolean, default: false },
  roles: [{ type: Schema.Types.ObjectId, ref: 'Rol' }],
}, {
  timestamps: true,
});

function pre(next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      throw err;
    }

    bcrypt.hash(user.password, salt, null, ($err, hash) => {
      if ($err) {
        throw $err;
      }

      user.password = hash;
      next();
    });
  });
}

userSchema.pre('save', pre);
userSchema.pre('update', pre);
userSchema.pre('findByIdAndUpdate', pre);
userSchema.pre('findOneAndUpdate', pre);

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
