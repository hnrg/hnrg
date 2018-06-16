import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,

  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,

  USER_ADD_REQUEST,
  USER_ADD_SUCCESS,
  USER_ADD_FAILURE,

  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,

  USER_ENABLE_REQUEST,
  USER_ENABLE_SUCCESS,
  USER_ENABLE_FAILURE,

  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,

  ON_USER_FORM_CLEAR,
  ON_USER_FORM_FIELD_CHANGE,
} from 'reducers/constants';

import { usersRequest } from 'reducers/lib/request/users-request';
import { authToken } from 'reducers/lib/store/auth-token';

export function getUsersRequest() {
  return {
    type: GET_USERS_REQUEST,
  };
}

export function getUsersSuccess(data) {
  return {
    type: GET_USERS_SUCCESS,
    payload: data,
  };
}

export function getUsersFailure(error) {
  return {
    type: GET_USERS_FAILURE,
    payload: error,
  };
}

export function getUsers(pageNumber, username, active, sessionToken) {
  return (dispatch) => {
    dispatch(getUsersRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => usersRequest.init(token).getUsers(pageNumber, username, active))
      .then((data) => {
        dispatch(getUsersSuccess(data));
      })
      .catch((error) => {
        dispatch(getUsersFailure(error.response.data.error));
      });
  };
}

/**
 * ## retreiving user actions
 */
export function getUserRequest() {
  return {
    type: GET_USER_REQUEST,
  };
}

export function getUserSuccess(user) {
  return {
    type: GET_USER_SUCCESS,
    payload: user,
  };
}

export function getUserFailure(error) {
  return {
    type: GET_USER_FAILURE,
    payload: error,
  };
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getUser(username, sessionToken) {
  return (dispatch) => {
    dispatch(getUserRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => usersRequest.init(token).getUser(username))
      .then((data) => {
        dispatch(getUserSuccess(data.user));
      })
      .catch((error) => {
        dispatch(getUserFailure(error.response.data.error));
      });
  };
}

export function onUserFormClear() {
  return {
    type: ON_USER_FORM_CLEAR,
  };
}

export function onUserFormFieldChange(field, value) {
  return {
    type: ON_USER_FORM_FIELD_CHANGE,
    payload: { field, value },
  };
}

export function userUpdateRequest() {
  return {
    type: USER_UPDATE_REQUEST,
  };
}

export function userUpdateSuccess() {
  return {
    type: USER_UPDATE_SUCCESS,
  };
}

export function userUpdateFailure(data) {
  return {
    type: USER_UPDATE_FAILURE,
    payload: data,
  };
}

/**
 * ## updateUser
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, the server is called with the data to update
 * If successful, get the user so that the screen is updated with
 * the data as now persisted on the serverx
 *
 */
export function updateUser(originalUsername, username, email, firstName, lastName, sessionToken) {
  return (dispatch) => {
    dispatch(userUpdateRequest());
    return authToken.getSessionToken(sessionToken)
      .then(token => usersRequest.init(token)
        .updateUser(originalUsername, {
          username,
          email,
          firstName,
          lastName,
        }))
      .then(() => {
        dispatch(userUpdateSuccess());
        dispatch(getUser(username));
      })
      .catch((error) => {
        dispatch(userUpdateFailure(error.response.data.error));
      });
  };
}

export function userAddRequest() {
  return {
    type: USER_ADD_REQUEST,
  };
}

export function userAddSuccess() {
  return {
    type: USER_ADD_SUCCESS,
  };
}

export function userAddFailure(data) {
  return {
    type: USER_ADD_FAILURE,
    payload: data,
  };
}

/**
 * ## addUser
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, the server is called with the data to add
 * If successful, get the user so that the screen is addd with
 * the data as now persisted on the serverx
 *
 */
export function addUser(username, email, password, firstName, lastName, sessionToken) {
  return (dispatch) => {
    dispatch(userAddRequest());
    return authToken.getSessionToken(sessionToken)
      .then(token => usersRequest.init(token)
        .addUser({
          username,
          email,
          password,
          firstName,
          lastName,
        }))
      .then(() => {
        dispatch(userAddSuccess());
      })
      .catch((error) => {
        dispatch(userAddFailure(error.response.data.error));
      });
  };
}

export function userDeleteRequest() {
  return {
    type: USER_DELETE_REQUEST,
  };
}

export function userDeleteSuccess() {
  return {
    type: USER_DELETE_SUCCESS,
  };
}

export function userDeleteFailure(data) {
  return {
    type: USER_DELETE_FAILURE,
    payload: data,
  };
}

/**
 * ## deleteUser
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, the server is called with the data to delete
 *
 */
export function deleteUser(username, sessionToken) {
  return (dispatch) => {
    dispatch(userDeleteRequest());
    return authToken.getSessionToken(sessionToken)
      .then(token => usersRequest.init(token).deleteUser(username))
      .then(() => {
        dispatch(userDeleteSuccess());
        dispatch(getUsers());
      })
      .catch((error) => {
        dispatch(userDeleteFailure(error.response.data.error));
      });
  };
}

export function userEnableRequest() {
  return {
    type: USER_ENABLE_REQUEST,
  };
}

export function userEnableSuccess() {
  return {
    type: USER_ENABLE_SUCCESS,
  };
}

export function userEnableFailure(data) {
  return {
    type: USER_ENABLE_FAILURE,
    payload: data,
  };
}

/**
 * ## enableUser
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, the server is called with the data to enable
 *
 */
export function enableUser(username, sessionToken) {
  return (dispatch) => {
    dispatch(userEnableRequest());
    return authToken.getSessionToken(sessionToken)
      .then(token => usersRequest.init(token).enableUser(username))
      .then(() => {
        dispatch(userEnableSuccess());
        dispatch(getUsers());
      })
      .catch((error) => {
        dispatch(userEnableFailure(error.response.data.error));
      });
  };
}
