import {
  GET_APARTAMENT_TYPES_REQUEST,
  GET_APARTAMENT_TYPES_SUCCESS,
  GET_APARTAMENT_TYPES_FAILURE,
} from 'reducers/constants';

import { apartmentTypesRequest } from 'reducers/lib/request/apartment-types-request';
import { authToken } from 'reducers/lib/store/auth-token';

import errorHandler from 'helpers/error-handler';

/**
 * ## retreiving profile actions
 */
export function getApartmentTypesRequest() {
  return {
    type: GET_APARTAMENT_TYPES_REQUEST,
  };
}

export function getApartmentTypesSuccess(apartmentTypes) {
  return {
    type: GET_APARTAMENT_TYPES_SUCCESS,
    payload: apartmentTypes,
  };
}

export function getApartmentTypesFailure(error) {
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
export function getApartmentTypes(pageNumber, sessionToken) {
  return (dispatch) => {
    dispatch(getApartmentTypesRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => apartmentTypesRequest.init(token).getApartmentTypes(pageNumber))
      .then((data) => {
        dispatch(getApartmentTypesSuccess(data.apartmentTypes));
      })
      .catch((error) => {
        dispatch(getApartmentTypesFailure(errorHandler(error)));
      });
  };
}
