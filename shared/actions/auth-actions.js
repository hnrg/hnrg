import axios from 'axios';
import Cookies from 'js-cookie';
import { reset } from 'redux-form';
import { getCookie, setCookie, expireCookie } from 'redux-cookie';
import {
  AUTH_USER,
  UNAUTH_USER,
} from '../constants';

import * as actions from './app-actions.js';

export function unauthError(response) {
  if (response.status === 401) {
    return logoutUser('Your session has expired. Please login again.');
  }

  return actions.errorHandler(response.data);
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
        Cookies.set('token', response.data.token, {path: '/'});
        Cookies.set('user', response.data.user, {path: '/'});
        dispatch({type: AUTH_USER});
      })
      .catch(response => dispatch(invalidLogin(response)));
  };
}

export function logoutUser(error) {
  Cookies.remove('token', {path: '/'});
  Cookies.remove('user', {path: '/'});
  actions.errorHandler(error);

  return ({
    type: UNAUTH_USER
  });
}
