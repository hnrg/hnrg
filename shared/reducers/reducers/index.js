import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// import reducers
import apartamentTypesReducer from './apartament-types';
import authReducer from './auth';
import configurationReducer from './configuration';
import demographicDataReducer from './demographic-data';
import documentTypesReducer from './document-types';
import globalReducer from './global';
import profileReducer from './profile';
import patientsReducer from './patients';
import healthControlsReducer from './health-controls';
import heatingTypesReducer from './heating-types';
import medicalInsurancesReducer from './medical-insurances';
import rolesReducer from './roles';
import permissionsReducer from './permissions';
import usersReducer from './users';
import waterTypesReducer from './water-types';

export default combineReducers({
  form: formReducer,
  apartamentTypes: apartamentTypesReducer,
  auth: authReducer,
  configuration: configurationReducer,
  demographicData: demographicDataReducer,
  documentTypes: documentTypesReducer,
  global: globalReducer,
  profile: profileReducer,
  patients: patientsReducer,
  healthControls: healthControlsReducer,
  heatingTypes: heatingTypesReducer,
  medicalInsurances: medicalInsurancesReducer,
  roles: rolesReducer,
  permissions: permissionsReducer,
  users: usersReducer,
  waterTypes: waterTypesReducer,
});
