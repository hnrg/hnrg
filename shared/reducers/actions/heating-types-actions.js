import {
  GET_HEATING_TYPES_REQUEST,
  GET_HEATING_TYPES_SUCCESS,
  GET_HEATING_TYPES_FAILURE,
} from 'reducers/constants';

import errorHandler from 'helpers/error-handler';
import { heatingTypesRequest } from 'reducers/lib/request/heating-types-request';
import { authToken } from 'reducers/lib/store/auth-token';

/**
 * ## retreiving profile actions
 */
export function getHeatingTypesRequest() {
  return {
    type: GET_HEATING_TYPES_REQUEST,
  };
}

export function getHeatingTypesSuccess(heatingTypes) {
  return {
    type: GET_HEATING_TYPES_SUCCESS,
    payload: heatingTypes,
  };
}

export function getHeatingTypesFailure(error) {
  return {
    type: GET_HEATING_TYPES_FAILURE,
    payload: error,
  };
}


/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getHeatingTypes(pageNumber, sessionToken) {
  return (dispatch) => {
    dispatch(getHeatingTypesRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => heatingTypesRequest.init(token).getHeatingTypes(pageNumber))
      .then((data) => {
        dispatch(getHeatingTypesSuccess(data.heatingTypes));
      })
      .catch((error) => {
        dispatch(getHeatingTypesFailure(errorHandler(error)));
      });
  };
}
