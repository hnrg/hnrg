import {
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILURE,

  GET_HEALTH_CONTROL_REQUEST,
  GET_HEALTH_CONTROL_SUCCESS,
  GET_HEALTH_CONTROL_FAILURE,

  HEALTH_CONTROL_ADD_REQUEST,
  HEALTH_CONTROL_ADD_SUCCESS,
  HEALTH_CONTROL_ADD_FAILURE,

  HEALTH_CONTROL_DELETE_REQUEST,
  HEALTH_CONTROL_DELETE_SUCCESS,
  HEALTH_CONTROL_DELETE_FAILURE,

  HEALTH_CONTROL_ENABLE_REQUEST,
  HEALTH_CONTROL_ENABLE_SUCCESS,
  HEALTH_CONTROL_ENABLE_FAILURE,

  HEALTH_CONTROL_UPDATE_REQUEST,
  HEALTH_CONTROL_UPDATE_SUCCESS,
  HEALTH_CONTROL_UPDATE_FAILURE,

  ON_HEALTH_CONTROL_FORM_CLEAR,
  ON_HEALTH_CONTROL_FORM_FIELD_CHANGE,
} from 'reducers/constants';

import { rolesRequest } from 'reducers/lib/request/roles-request';
import { authToken } from 'reducers/lib/store/auth-token';

/**
 * ## retreiving profile actions
 */
export function getRolesRequest() {
  return {
    type: GET_ROLES_REQUEST,
  };
}

export function getRolesSuccess(data) {
  return {
    type: GET_ROLES_SUCCESS,
    payload: data,
  };
}

export function getRolesFailure(error) {
  return {
    type: GET_ROLES_FAILURE,
    payload: error,
  };
}

export function getRolRequest() {
  return {
    type: GET_HEALTH_CONTROL_REQUEST,
  };
}

export function getRolSuccess(rol) {
  return {
    type: GET_HEALTH_CONTROL_SUCCESS,
    payload: rol,
  };
}

export function getRolFailure(error) {
  return {
    type: GET_HEALTH_CONTROL_FAILURE,
    payload: error,
  };
}

/**
 * ## State actions
 * controls which form is displayed to the rol
 * as in login, register, logout or reset password
 */
export function getRoles(pageNumber, name, deleted, sessionToken) {
  return (dispatch) => {
    dispatch(getRolesRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => rolesRequest.init(token).getRoles(pageNumber, name, deleted))
      .then((data) => {
        dispatch(getRolesSuccess(data));
      })
      .catch((error) => {
        dispatch(getRolesFailure(error.response.data.error));
      });
  };
}

export function getRol(rolname, sessionToken) {
  return (dispatch) => {
    dispatch(getRolRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => rolesRequest.init(token).getRol(rolname))
      .then((data) => {
        dispatch(getRolSuccess(data.rol));
      })
      .catch((error) => {
        dispatch(getRolFailure(error.response.data.error));
      });
  };
}

export function onRolFormFieldChange(field, value) {
  return {
    type: ON_HEALTH_CONTROL_FORM_FIELD_CHANGE,
    payload: { field, value },
  };
}

export function onRolFormClear() {
  return {
    type: ON_HEALTH_CONTROL_FORM_CLEAR,
  };
}

export function rolAddRequest() {
  return {
    type: HEALTH_CONTROL_ADD_REQUEST,
  };
}

export function rolAddSuccess() {
  return {
    type: HEALTH_CONTROL_ADD_SUCCESS,
  };
}

export function rolAddFailure(data) {
  return {
    type: HEALTH_CONTROL_ADD_FAILURE,
    payload: data,
  };
}

/**
 * ## addRol
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, the server is called with the data to add
 * If successful, get the rol so that the screen is updated with
 * the data as now persisted on the serverx
 *
 */
export function addRol(name, permissions, sessionToken) {
  return (dispatch) => {
    dispatch(rolAddRequest());
    return authToken.getSessionToken(sessionToken)
      .then(token => rolesRequest.init(token)
        .addRol({
          name,
          permissions,
        }))
      .then(() => {
        dispatch(rolAddSuccess());
      })
      .catch((error) => {
        console.log(error);
        dispatch(rolAddFailure(error.response.data.error));
      });
  };
}

export function rolUpdateRequest() {
  return {
    type: HEALTH_CONTROL_UPDATE_REQUEST,
  };
}

export function rolUpdateSuccess() {
  return {
    type: HEALTH_CONTROL_UPDATE_SUCCESS,
  };
}

export function rolUpdateFailure(data) {
  return {
    type: HEALTH_CONTROL_UPDATE_FAILURE,
    payload: data,
  };
}

/**
 * ## updateRol
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, the server is called with the data to update
 * If successful, get the rol so that the screen is updated with
 * the data as now persisted on the serverx
 *
 */
export function updateRol(originalRolname, name, permissions, sessionToken) {
  return (dispatch) => {
    dispatch(rolUpdateRequest());
    return authToken.getSessionToken(sessionToken)
      .then(token => rolesRequest.init(token)
        .updateRol(originalRolname, {
          name,
          permissions,
        }))
      .then(() => {
        dispatch(rolUpdateSuccess());
        dispatch(getRol(name));
      })
      .catch((error) => {
        dispatch(rolUpdateFailure(error.response.data.error));
      });
  };
}

export function rolDeleteRequest() {
  return {
    type: HEALTH_CONTROL_DELETE_REQUEST,
  };
}

export function rolDeleteSuccess() {
  return {
    type: HEALTH_CONTROL_DELETE_SUCCESS,
  };
}

export function rolDeleteFailure(data) {
  return {
    type: HEALTH_CONTROL_DELETE_FAILURE,
    payload: data,
  };
}

export function deleteRol(name, sessionToken) {
  return (dispatch) => {
    dispatch(rolDeleteRequest());
    return authToken.getSessionToken(sessionToken)
      .then(token => rolesRequest.init(token).deleteRol(name))
      .then(() => {
        dispatch(rolDeleteSuccess());
        dispatch(getRoles());
      })
      .catch((error) => {
        dispatch(rolDeleteFailure(error.response.data.error));
      });
  };
}

export function rolEnableRequest() {
  return {
    type: HEALTH_CONTROL_ENABLE_REQUEST,
  };
}

export function rolEnableSuccess() {
  return {
    type: HEALTH_CONTROL_ENABLE_SUCCESS,
  };
}

export function rolEnableFailure(data) {
  return {
    type: HEALTH_CONTROL_ENABLE_FAILURE,
    payload: data,
  };
}

export function enableRol(name, sessionToken) {
  return (dispatch) => {
    dispatch(rolEnableRequest());
    return authToken.getSessionToken(sessionToken)
      .then(token => rolesRequest.init(token).enableRol(name))
      .then(() => {
        dispatch(rolEnableSuccess());
        dispatch(getRoles());
      })
      .catch((error) => {
        dispatch(rolEnableFailure(error.response.data.error));
      });
  };
}
