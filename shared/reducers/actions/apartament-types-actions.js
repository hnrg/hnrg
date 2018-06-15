import {
  GET_APARTAMENT_TYPES_REQUEST,
  GET_APARTAMENT_TYPES_SUCCESS,
  GET_APARTAMENT_TYPES_FAILURE,
} from 'reducers/constants';

import { apartamentTypesRequest } from 'reducers/lib/request/apartament-types-request';
import { authToken } from 'reducers/lib/store/auth-token';

/**
 * ## retreiving profile actions
 */
export function getApartamentTypesRequest() {
  return {
    type: GET_APARTAMENT_TYPES_REQUEST,
  };
}

export function getApartamentTypesSuccess(apartamentTypes) {
  return {
    type: GET_APARTAMENT_TYPES_SUCCESS,
    payload: apartamentTypes,
  };
}

export function getApartamentTypesFailure(error) {
  return {
    type: GET_APARTAMENT_TYPES_FAILURE,
    payload: error,
  };
}


/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getApartamentTypes(pageNumber, sessionToken) {
  return (dispatch) => {
    dispatch(getApartamentTypesRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => apartamentTypesRequest.init(token).getApartamentTypes(pageNumber))
      .then((data) => {
        dispatch(getApartamentTypesSuccess(data.apartamentTypes));
      })
      .catch((error) => {
        dispatch(getApartamentTypesFailure(error));
      });
  };
}
