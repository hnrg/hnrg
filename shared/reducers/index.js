import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// import reducers
import authReducer from './auth';
import authFormReducer from './auth-form';
import configurationReducer from './configuration';
import globalReducer from './global';
import profileReducer from './profile';
import patientsReducer from './patients';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  authFormValidation: authFormReducer,
  configuration: configurationReducer,
  global: globalReducer,
  profile: profileReducer,
  patients: patientsReducer,
});
