import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// import reducers
import apartamentTypesReducer from './apartament-types';
import authReducer from './auth';
import configurationReducer from './configuration';
import documentTypesReducer from './document-types';
import globalReducer from './global';
import profileReducer from './profile';
import patientsReducer from './patients';
import healthControlsReducer from './health-controls';
import heatingTypesReducer from './heating-types';
import rolesReducer from './roles';
import permissionsReducer from './permissions';
import usersReducer from './users';

export default combineReducers({
  form: formReducer,
  apartamentTypes: apartamentTypesReducer,
  auth: authReducer,
  configuration: configurationReducer,
  documentTypes: documentTypesReducer,
  global: globalReducer,
  profile: profileReducer,
  patients: patientsReducer,
  healthControls: healthControlsReducer,
  heatingTypes: heatingTypesReducer,
  roles: rolesReducer,
  permissions: permissionsReducer,
  users: usersReducer,
});
