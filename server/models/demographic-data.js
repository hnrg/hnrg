const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApartmentType = require('./apartament-type');
const HeatingType= require('./heating-type');
const WaterType = require('./water-type');

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
    ref: ApartmentType,
    required: 'El campo `tipo de vivienda` es requerido'
  },
  heatingTypeId: {
    type: Schema.Types.ObjectId,
    ref: HeatingType,
    required: 'El campo `tipo de calefacción` es requerido'
  },
  waterTypeId: {
    type: Schema.Types.ObjectId,
    ref: WaterType,
    required: 'El campo `tipo de agua` es requerido'
  },
});

module.exports = mongoose.model('DemographicData', demographicDataSchema);
