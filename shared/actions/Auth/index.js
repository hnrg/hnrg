import axios from 'axios';
import { reset } from 'redux-form';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import {
  AUTH_USER,
  ERROR_RESPONSE,
  UNAUTH_USER,
  CLEAR_ERRORS
} from './types';

// server route
const API_URL = 'http://localhost:8000/api';
const AUTH_URL = 'http://localhost:8000/auth';
const ROOT_URL = 'http://localhost:8080';

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

export function loginUser({
  email,
  password
}) {
  return function(dispatch) {
    axios.post(`${AUTH_URL}/login`, {
        email,
        password
      })
      .then(response => {
        cookie.save('token', response.data.token, {
          path: '/'
        });
        cookie.save('user', response.data.user, {
          path: '/'
        });
        dispatch({
          type: AUTH_USER
        });

        window.location.href = ROOT_URL + "/dashboard";
      })
      .catch(response => dispatch(invalidLogin(response)));
  }
}

//logout user
export function logoutUser(error) {
  cookie.remove('token', {
    path: '/'
  });
  cookie.remove('user', {
    path: '/'
  });

  errorHandler(error);
  window.location.href = ROOT_URL + "/login";

  return ({
    type: UNAUTH_USER
  });
}
