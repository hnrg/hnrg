import {
  ERROR_RESPONSE,
  CLEAR_ERRORS
} from '../constants';

const INITIAL_STATE = {
  error: '',
  message: '',
  content: '',
  authenticated: false
}

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case ERROR_RESPONSE:
      return { ...state, error: action.payload };
    case CLEAR_ERRORS:
      return { ...state, error: '' };
  }

  return state;
}
