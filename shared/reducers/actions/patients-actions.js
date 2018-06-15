import {
  GET_PATIENTS_REQUEST,
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAILURE,

  GET_PATIENT_REQUEST,
  GET_PATIENT_SUCCESS,
  GET_PATIENT_FAILURE,
} from 'reducers/constants';

import { patientsRequest } from 'reducers/lib/request/patients-request';
import { authToken } from 'reducers/lib/store/auth-token';

/**
 * ## retreiving profile actions
 */
export function getPatientsRequest() {
  return {
    type: GET_PATIENTS_REQUEST,
  };
}

export function getPatientsSuccess(data) {
  return {
    type: GET_PATIENTS_SUCCESS,
    payload: data,
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
export function getPatients(pageNumber, firtsName, lastName, documentType, documentNumber, sessionToken) {
  return (dispatch) => {
    dispatch(getPatientsRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => patientsRequest.init(token).getPatients(pageNumber, firtsName, lastName, documentType, documentNumber))
      .then((data) => {
        dispatch(getPatientsSuccess(data));
      })
      .catch((error) => {
        dispatch(getPatientsFailure(error.response.data.error));
      });
  };
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getPatient(patient, sessionToken) {
  return (dispatch) => {
    dispatch(getPatientRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => patientsRequest.init(token).getPatient(patient))
      .then((data) => {
        dispatch(getPatientSuccess(data.patient));
      })
      .catch((error) => {
        dispatch(getPatientFailure(error.response.data.error));
      });
  };
}

