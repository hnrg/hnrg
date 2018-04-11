import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

//import reducers
import authReducer from './auth';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
});
