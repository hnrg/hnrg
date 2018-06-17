import {
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILURE,

  GET_ROL_REQUEST,
  GET_ROL_SUCCESS,
  GET_ROL_FAILURE,

  ROL_ADD_REQUEST,
  ROL_ADD_SUCCESS,
  ROL_ADD_FAILURE,

  ROL_DELETE_REQUEST,
  ROL_DELETE_SUCCESS,
  ROL_DELETE_FAILURE,

  ROL_PERMISSION_DELETE_REQUEST,
  ROL_PERMISSION_DELETE_SUCCESS,
  ROL_PERMISSION_DELETE_FAILURE,

  ROL_UPDATE_REQUEST,
  ROL_UPDATE_SUCCESS,
  ROL_UPDATE_FAILURE,

  ON_ROL_FORM_FIELD_CHANGE,
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
    type: GET_ROL_REQUEST,
  };
}

export function getRolSuccess(rol) {
  return {
    type: GET_ROL_SUCCESS,
    payload: rol,
  };
}

export function getRolFailure(error) {
  return {
    type: GET_ROL_FAILURE,
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
    type: ON_ROL_FORM_FIELD_CHANGE,
    payload: { field, value },
  };
}

export function rolUpdateRequest() {
  return {
    type: ROL_UPDATE_REQUEST,
  };
}

export function rolUpdateSuccess() {
  return {
    type: ROL_UPDATE_SUCCESS,
  };
}

export function rolUpdateFailure(data) {
  return {
    type: ROL_UPDATE_FAILURE,
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
export function updateRol(originalRolname, name, sessionToken) {
  return (dispatch) => {
    dispatch(rolUpdateRequest());
    return authToken.getSessionToken(sessionToken)
      .then(token => rolesRequest.init(token)
        .updateRol(originalRolname, {
          name,
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
    type: ROL_DELETE_REQUEST,
  };
}

export function rolDeleteSuccess() {
  return {
    type: ROL_DELETE_SUCCESS,
  };
}

export function rolDeleteFailure(data) {
  return {
    type: ROL_DELETE_FAILURE,
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
        dispatch(getRoles(name));
      })
      .catch((error) => {
        dispatch(rolDeleteFailure(error.response.data.error));
      });
  };
}

export function rolPermissionDeleteRequest() {
  return {
    type: ROL_PERMISSION_DELETE_REQUEST,
  };
}

export function rolPermissionDeleteSuccess() {
  return {
    type: ROL_PERMISSION_DELETE_SUCCESS,
  };
}

export function rolPermissionDeleteFailure(data) {
  return {
    type: ROL_PERMISSION_DELETE_FAILURE,
    payload: data,
  };
}

export function deleteRolPermission(rolname, permission, sessionToken) {
  return (dispatch) => {
    dispatch(rolPermissionDeleteRequest());
    return authToken.getSessionToken(sessionToken)
      .then(token => rolesRequest.init(token).deleteRolPermission(rolname, permission))
      .then(() => {
        dispatch(rolPermissionDeleteSuccess());
        dispatch(getRol(rolname));
      })
      .catch((error) => {
        dispatch(rolPermissionDeleteFailure(error.response.data.error));
      });
  };
}
