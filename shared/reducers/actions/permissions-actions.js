import {
  GET_PERMISSIONS_REQUEST,
  GET_PERMISSIONS_SUCCESS,
  GET_PERMISSIONS_FAILURE,
} from 'reducers/constants';

import errorHandler from 'helpers/error-handler';
import { permissionsRequest } from 'reducers/lib/request/permissions-request';
import { authToken } from 'reducers/lib/store/auth-token';

/**
 * ## retreiving profile actions
 */
export function getPermissionsRequest() {
  return {
    type: GET_PERMISSIONS_REQUEST,
  };
}

export function getPermissionsSuccess(permissions) {
  return {
    type: GET_PERMISSIONS_SUCCESS,
    payload: permissions,
  };
}

export function getPermissionsFailure(error) {
  return {
    type: GET_PERMISSIONS_FAILURE,
    payload: error,
  };
}


/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getPermissions(sessionToken) {
  return (dispatch) => {
    dispatch(getPermissionsRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => permissionsRequest.init(token).getPermissions())
      .then((data) => {
        dispatch(getPermissionsSuccess(data.permissions));
      })
      .catch((error) => {
        dispatch(getPermissionsFailure(errorHandler(error)));
      });
  };
}
