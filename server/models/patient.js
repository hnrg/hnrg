const mongoose = require('mongoose');
const Schema = mongoose.Schema


const patientSchema = new mongoose.Schema({
  firstName: {
    type: 'String',
    trim: true,
    required: 'El campo `nombre` es requerido'
  },
  lastName: {
    type: 'String',
    trim: true,
    required: 'El campo `apellido` es requerido'
  },
  address: { type: 'String', trim: true },
  phone: {
    type: 'String',
    trim: true,
    match: [
      /^\+?[0-9]{3}-?[0-9]{6,12}$/,
      'Ingrese un telefono válido - +54221111444'
    ]
  },
  birthday: {
    type: 'Date',
    required: 'El campo `fecha de nacimiento` es requerido'
  },
  sex: {
    type: 'String',
    default: 'Otro',
    match: [
      /Masculino|Femenino|Otro/,
      'Indique un sexo valido'
    ]
  },
  demographicDataId: { type: Schema.Types.ObjectId },
  medicalInsuranceId: { type: Schema.Types.ObjectId },
  documentTypeId: {
    type: Schema.Types.ObjectId,
    required: 'El campo `tipo de documento` es requerido'
  },
  documentNumber: {
    type: 'Number',
    required: 'El campo `número de documento` es requerido'
  },
  deleted: {
    type: 'Boolean',
    default: false
  },
});

module.exports = mongoose.model('Patient', patientSchema);
