import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// import reducers
import analyticsReducer from './analytics';
import apartmentTypesReducer from './apartment-types';
import authReducer from './auth';
import configurationReducer from './configuration';
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
  analytics: analyticsReducer,
  apartmentTypes: apartmentTypesReducer,
  auth: authReducer,
  configuration: configurationReducer,
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
