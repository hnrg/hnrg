import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

//import reducers
import globalReducer from './global';
import authReducer from './auth';
import authFormReducer from './auth-form';
import profileReducer from './profile';

export default combineReducers({
  form: formReducer,
  global: globalReducer,
  profile: profileReducer,
  authFormValidation: authFormReducer,
  auth: authReducer,
});
