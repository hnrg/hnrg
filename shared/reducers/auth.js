import {
  AUTH_USER,
  UNAUTH_USER,
  ERROR_RESPONSE,
  CLEAR_ERRORS,
  PROTECTED_TEST
} from '../constants';

const INITIAL_STATE = {
  error: '',
  message: '',
  content: '',
  authenticated: false
}

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', message: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case ERROR_RESPONSE:
      return { ...state, error: action.payload };
    case CLEAR_ERRORS:
      return { ...state, error: '' };
    case PROTECTED_TEST:
      return { ...state, content: action.payload };
  }

  return state;
}
