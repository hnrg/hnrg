import {
  ERROR_RESPONSE,
  CLEAR_ERRORS
} from '../constants';

export function errorHandler(error) {
  return {
    type: ERROR_RESPONSE,
    payload: error
  };
}

export function clearErrors() {
  return {
    type: CLEAR_ERRORS
  };
}
