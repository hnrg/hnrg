import {
  GET_MEDICAL_INSURANCES_REQUEST,
  GET_MEDICAL_INSURANCES_SUCCESS,
  GET_MEDICAL_INSURANCES_FAILURE,
} from 'reducers/constants';

import { errorHandler } from 'helpers/error-handler';
import { medicalInsurancesRequest } from 'reducers/lib/request/medical-insurances-request';
import { authToken } from 'reducers/lib/store/auth-token';

/**
 * ## retreiving profile actions
 */
export function getMedicalInsurancesRequest() {
  return {
    type: GET_MEDICAL_INSURANCES_REQUEST,
  };
}

export function getMedicalInsurancesSuccess(medicalInsurances) {
  return {
    type: GET_MEDICAL_INSURANCES_SUCCESS,
    payload: medicalInsurances,
  };
}

export function getMedicalInsurancesFailure(error) {
  return {
    type: GET_MEDICAL_INSURANCES_FAILURE,
    payload: error,
  };
}


/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getMedicalInsurances(pageNumber, sessionToken) {
  return (dispatch) => {
    dispatch(getMedicalInsurancesRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => medicalInsurancesRequest.init(token).getMedicalInsurances(pageNumber))
      .then((data) => {
        dispatch(getMedicalInsurancesSuccess(data.medicalInsurances));
      })
      .catch((error) => {
        dispatch(getMedicalInsurancesFailure(errorHandler(error)));
      });
  };
}
