import {
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILURE,

  GET_ROL_REQUEST,
  GET_ROL_SUCCESS,
  GET_ROL_FAILURE,
} from '../constants';

import { rolesRequest } from '../lib/request/roles-request';
import { authToken } from '../lib/store/auth-token';

/**
 * ## retreiving profile actions
 */
export function getRolesRequest() {
  return {
    type: GET_ROLES_REQUEST,
  };
}

export function getRolesSuccess(roles) {
  return {
    type: GET_ROLES_SUCCESS,
    payload: roles,
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
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getRoles(sessionToken) {
  return (dispatch) => {
    dispatch(getRolesRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => rolesRequest.init(token).getRoles())
      .then((json) => {
        dispatch(getRolesSuccess(json.roles));
      })
      .catch((error) => {
        dispatch(getRolesFailure(error));
      });
  };
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getRol(sessionToken, rol) {
  return (dispatch) => {
    dispatch(getRolRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => rolesRequest.init(token).getRol(rol))
      .then((json) => {
        dispatch(getRolSuccess(json.rol));
      })
      .catch((error) => {
        dispatch(getRolFailure(error));
      });
  };
}

