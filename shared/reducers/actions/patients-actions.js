import {
  GET_PATIENTS_REQUEST,
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAILURE,

  GET_PATIENT_REQUEST,
  GET_PATIENT_SUCCESS,
  GET_PATIENT_FAILURE,
} from 'constants';

import { patientsRequest } from 'reducers/lib//request/patients-request';
import { authToken } from 'reducers/lib//store/auth-token';

/**
 * ## retreiving profile actions
 */
export function getPatientsRequest() {
  return {
    type: GET_PATIENTS_REQUEST,
  };
}

export function getPatientsSuccess(patients) {
  return {
    type: GET_PATIENTS_SUCCESS,
    payload: patients,
  };
}

export function getPatientsFailure(error) {
  return {
    type: GET_PATIENTS_FAILURE,
    payload: error,
  };
}

export function getPatientRequest() {
  return {
    type: GET_PATIENT_REQUEST,
  };
}

export function getPatientSuccess(patient) {
  return {
    type: GET_PATIENT_SUCCESS,
    payload: patient,
  };
}

export function getPatientFailure(error) {
  return {
    type: GET_PATIENT_FAILURE,
    payload: error,
  };
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getPatients(sessionToken, pageNumber) {
  return (dispatch) => {
    dispatch(getPatientsRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => patientsRequest.init(token).getPatients(pageNumber))
      .then((json) => {
        dispatch(getPatientsSuccess(json.patients));
      })
      .catch((error) => {
        dispatch(getPatientsFailure(error));
      });
  };
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getPatient(sessionToken, patient) {
  return (dispatch) => {
    dispatch(getPatientRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => patientsRequest.init(token).getPatient(patient))
      .then((json) => {
        dispatch(getPatientSuccess(json.patient));
      })
      .catch((error) => {
        dispatch(getPatientFailure(error));
      });
  };
}

