import axios from 'axios';
import { reset } from 'redux-form';
import { getCookie, setCookie, expireCookie } from 'redux-cookie';
import {
  AUTH_USER,
  ERROR_RESPONSE,
  UNAUTH_USER,
  RESET_PASSWORD_REQUEST,
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

export function unauthError(response) {
  if (response.status === 401) {
    return logoutUser('Your session has expired. Please login again.');
  }

  return errorHandler(response.data);
}

export function invalidLogin(response) {
  if (response.status === 401) {
    return {
      type: ERROR_RESPONSE,
      payload: "You entered incorrect information!"
    };
  } else if (response.status === 400) {
    return {
      type: ERROR_RESPONSE,
      payload: "Please enter both your email and password."
    };
  }
}

export function loginUser({email, password}) {
  return function(dispatch) {
    axios.post('/api/auth/login', {
        email,
        password
      })
      .then(response => {
        setCookie('token', response.data.token, {path: '/'});
        setCookie('user', response.data.user, {path: '/'});
        dispatch({type: AUTH_USER});
      })
      .catch(response => dispatch(invalidLogin(response)));
  };
}

export function logoutUser(error) {
  expireCookie('token', {path: '/'});
  expireCookie('user', {path: '/'});
  errorHandler(error);

  return ({
    type: UNAUTH_USER
  });
}

export function resetPassword(token, {password}) {
  return function(dispatch) {
    axios.post(`/auth/reset-password/${token}`, {password})
      .then(response => {
        dispatch({
          type: RESET_PASSWORD_REQUEST,
          payload: response.data.message,
        });
      })
      .catch(response => dispatch(errorHandler(response.data.error)));
  };
}
