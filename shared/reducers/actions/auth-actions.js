import _ from 'underscore';

import { authRequest } from 'reducers/lib/request/auth-request';
import { authToken } from 'reducers/lib/store/auth-token';
import errorHandler from 'helpers/error-handler';

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

  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
} from 'reducers/constants';


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
        dispatch(sessionTokenRequestFailure(errorHandler(error)));
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
 * ## Logout
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
      })
      .catch((error) => {
        dispatch(loginState());
        dispatch(logoutFailure(errorHandler(error)));
      });
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
      .then(data => saveSessionToken(data.token)
        .then(() => {
          dispatch(loginSuccess(data.token));
          dispatch(logoutState());
        }))
      .catch((error) => {
        dispatch(loginFailure(errorHandler(error)));
      });
  };
}

/**
 * ## retreiving profile actions
 */
export function authenticateRequest() {
  return {
    type: AUTHENTICATE_REQUEST,
  };
}

export function authenticateSuccess(user) {
  return {
    type: AUTHENTICATE_SUCCESS,
    payload: user,
  };
}

export function authenticateFailure(error) {
  return {
    type: AUTHENTICATE_FAILURE,
    payload: error,
  };
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function authenticate(sessionToken) {
  return (dispatch) => {
    dispatch(authenticateRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => authRequest.init(token).authenticate())
      .then((data) => {
        dispatch(authenticateSuccess(data.user));
      })
      .catch((error) => {
        dispatch(authenticateFailure(errorHandler(error)));
      });
  };
}
