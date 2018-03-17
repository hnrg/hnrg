const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const demographicDataSchema = new Schema({
  refrigerator: {
    type: Boolean,
    required: 'El campo `refrigerador` es requerido'
  },
  electricity: {
    type: Boolean,
    required: 'El campo `electricidad` es requerido'
  },
  pet: {
    type: Boolean,
    required: 'El campo `mascota` es requerido'
  },
  apartmentTypeId: {
    type: Schema.Types.ObjectId,
    required: 'El campo `tipo de vivienda` es requerido'
  },
  heatingTypeId: {
    type: Schema.Types.ObjectId,
    required: 'El campo `tipo de calefacción` es requerido'
  },
  waterTypeId: {
    type: Schema.Type.ObjectId,
    required: 'El campo `tipo de agua` es requerido'
  },
});

module.exports = mongoose.model('DemographicData', demographicDataSchema);
