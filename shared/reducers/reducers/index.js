import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// import reducers
import authReducer from './auth';
import configurationReducer from './configuration';
import globalReducer from './global';
import profileReducer from './profile';
import patientsReducer from './patients';
import healthControlsReducer from './health-controls';
import rolesReducer from './roles';
import permissionsReducer from './permissions';
import usersReducer from './users';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  configuration: configurationReducer,
  global: globalReducer,
  profile: profileReducer,
  patients: patientsReducer,
  healthControls: healthControlsReducer,
  roles: rolesReducer,
  permissions: permissionsReducer,
  users: usersReducer,
});
