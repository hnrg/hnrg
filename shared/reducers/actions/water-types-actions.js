import {
  GET_WATER_TYPES_REQUEST,
  GET_WATER_TYPES_SUCCESS,
  GET_WATER_TYPES_FAILURE,
} from 'reducers/constants';

import errorHandler from 'helpers/error-handler';
import { waterTypesRequest } from 'reducers/lib/request/water-types-request';
import { authToken } from 'reducers/lib/store/auth-token';

/**
 * ## retreiving profile actions
 */
export function getWaterTypesRequest() {
  return {
    type: GET_WATER_TYPES_REQUEST,
  };
}

export function getWaterTypesSuccess(waterTypes) {
  return {
    type: GET_WATER_TYPES_SUCCESS,
    payload: waterTypes,
  };
}

export function getWaterTypesFailure(error) {
  return {
    type: GET_WATER_TYPES_FAILURE,
    payload: error,
  };
}


/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getWaterTypes(pageNumber, sessionToken) {
  return (dispatch) => {
    dispatch(getWaterTypesRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => waterTypesRequest.init(token).getWaterTypes(pageNumber))
      .then((data) => {
        dispatch(getWaterTypesSuccess(data.waterTypes));
      })
      .catch((error) => {
        dispatch(getWaterTypesFailure(errorHandler(error)));
      });
  };
}
