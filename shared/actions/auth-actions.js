import axios from 'axios';
import Cookies from 'js-cookie';
import { reset } from 'redux-form';
import { getCookie, setCookie, expireCookie } from 'redux-cookie';
import {
  AUTH_USER,
  UNAUTH_USER,
  FETCH_USER,
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
        global.window.location.replace('/dashboard');

      })
      .catch(response => dispatch(invalidLogin(response)));
  };
}

export function fetchUser() {
  return function(dispatch) {
    const token = Cookies.get('token', {path:'/'});
    axios.get('/api/auth/me', {
        headers: {
          Authorization: token,
        },
      })
      .then(response => {
        Cookies.set('connectedUser', response.data.user, {path:'/'});
        dispatch({type: FETCH_USER});
      })
      .catch(response => dispatch(actions.errorHandler(response)));
  };
}

export function logoutUser(error) {
  return dispatch => {
    Cookies.remove('token', {path: '/'});
    Cookies.remove('user', {path: '/'});
    Cookies.remove('connectedUser', {path: '/'});
    actions.errorHandler(error);

    dispatch({
      type: UNAUTH_USER
    });

    global.window.location.replace('/login');
  }
}
