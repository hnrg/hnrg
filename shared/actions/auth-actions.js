

import axios from 'axios';
import Cookies from 'js-cookie';
import _ from 'underscore';
import { reset } from 'redux-form';

import { authRequest } from '../lib/request/auth-request';
import { authToken } from '../lib/store/auth-token';

import {
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,

  LOGOUT,
  LOGIN,
  FORGOT_PASSWORD,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  ON_AUTH_FORM_FIELD_CHANGE,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,

  SET_STATE,
} from '../constants';


/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, logout or reset password
 */

export function logoutState() {
  return {
    type: LOGOUT,
  };
}

export function loginState() {
  return {
    type: LOGIN,
  };
}

export function forgotPasswordState() {
  return {
    type: FORGOT_PASSWORD,
  };
}

/**
 * ## Logout actions
 */
export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}
export function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    payload: error,
  };
}

/**
 * ## Login
 * After dispatching the logoutRequest, get the sessionToken
 *
 *
 * When the response is received and it's valid
 * change the state to login and finish the logout
 *
 * But if the call fails, like expired token or
 * no network connection, just send the failure
 *
 * And if you fail due to an invalid sessionToken, be sure
 * to delete it so the user can log in.
 *
 * How could there be an invalid sessionToken?  Maybe they
 * haven't used the app for a long time.  Or they used another
 * device and logged out there.
 */
export function logout() {
  return (dispatch) => {
    dispatch(logoutRequest());
    return authToken.getSessionToken()
      .then(() => {
        dispatch(loginState());
        dispatch(logoutSuccess());
        dispatch(deleteSessionToken());
        global.window.location.replace('/');
      })
      .catch((error) => {
        dispatch(loginState());
        dispatch(logoutFailure(error));
      });
  };
}
/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */
export function onAuthFormFieldChange(field, value) {
  return {
    type: ON_AUTH_FORM_FIELD_CHANGE,
    payload: {
      field,
      value,
    },
  };
}

/**
 * ## SessionToken actions
 */
export function sessionTokenRequest() {
  return {
    type: SESSION_TOKEN_REQUEST,
  };
}

export function sessionTokenRequestSuccess(token) {
  return {
    type: SESSION_TOKEN_SUCCESS,
    payload: token,
  };
}

export function sessionTokenRequestFailure(error) {
  return {
    type: SESSION_TOKEN_FAILURE,
    payload: _.isUndefined(error) ? null : error,
  };
}

/**
 * ## DeleteToken actions
 */
export function deleteTokenRequest() {
  return {
    type: DELETE_TOKEN_REQUEST,
  };
}
export function deleteTokenRequestSuccess() {
  return {
    type: DELETE_TOKEN_SUCCESS,
  };
}

/**
 * ## Delete session token
 *
 * Call the authToken deleteSessionToken
 */
export function deleteSessionToken() {
  return (dispatch) => {
    dispatch(deleteTokenRequest());
    return authToken.deleteSessionToken()
      .then(() => {
        dispatch(deleteTokenRequestSuccess());
      });
  };
}

/**
 * ## Token
 * If authToken has the sessionToken, the user is logged in
 * so set the state to logout.
 * Otherwise, the user will default to the login in screen.
 */
export function getSessionToken() {
  return (dispatch) => {
    dispatch(sessionTokenRequest());
    return authToken.getSessionToken()
      .then((token) => {
        if (token) {
          dispatch(sessionTokenRequestSuccess(token));
          dispatch(logoutState());
        } else {
          dispatch(sessionTokenRequestFailure());
        }
      })
      .catch((error) => {
        dispatch(sessionTokenRequestFailure(error));
        dispatch(loginState());
      });
  };
}

/**
 * ## saveSessionToken
 * @param {Object} response - to return to keep the promise chain
 * @param {Object} sessionToken - object with sessionToken
 */
export function saveSessionToken(sessionToken) {
  return authToken.storeSessionToken(sessionToken);
}

/**
 * ## Login actions
 */
export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function loginSuccess(sessionToken) {
  return {
    type: LOGIN_SUCCESS,
    payload: sessionToken,
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
}
/**
 * ## Login
 * @param {string} email - user's email
 * @param {string} password - user's password
 *
 * After calling Backend, if response is good, save the sessionToken
 * which is the currentUser which contains the sessionToken
 *
 * If successful, set the state to logout
 * otherwise, dispatch a failure
 */

export function login({ email, password }) {
  return (dispatch) => {
    dispatch(loginRequest());
    return authRequest.login({
      email,
      password,
    })
      .then(json => saveSessionToken(json.token)
        .then(() => {
          dispatch(loginSuccess(json.token));
          global.window.location.replace('/dashboard');
          dispatch(logoutState());
        }))
      .catch((error) => {
        dispatch(loginFailure(error));
      });
  };
}

/**
 * ## ResetPassword actions
 */
export function resetPasswordRequest() {
  return {
    type: RESET_PASSWORD_REQUEST,
  };
}

export function resetPasswordSuccess() {
  return {
    type: RESET_PASSWORD_SUCCESS,
  };
}

export function resetPasswordFailure(error) {
  return {
    type: RESET_PASSWORD_FAILURE,
    payload: error,
  };
}

/**
 * ## ResetPassword
 *
 * @param {string} email - the email address to reset password
 * *Note* There's no feedback to the user whether the email
 * address is valid or not.
 *
 * This functionality depends on the server set
 * up correctly ie, that emails are verified.
 * With that enabled, an email can be sent w/ a
 * form for setting the new password.
 */
export function resetPassword(email) {

}
