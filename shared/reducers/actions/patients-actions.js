import {
  GET_PATIENTS_REQUEST,
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAILURE,

  GET_PATIENT_REQUEST,
  GET_PATIENT_SUCCESS,
  GET_PATIENT_FAILURE,

  PATIENT_ADD_REQUEST,
  PATIENT_ADD_SUCCESS,
  PATIENT_ADD_FAILURE,

  PATIENT_UPDATE_REQUEST,
  PATIENT_UPDATE_SUCCESS,
  PATIENT_UPDATE_FAILURE,

  PATIENT_DELETE_REQUEST,
  PATIENT_DELETE_SUCCESS,
  PATIENT_DELETE_FAILURE,

  ON_PATIENT_FORM_CLEAR,
  ON_PATIENT_FORM_FIELD_CHANGE,
} from 'reducers/constants';

import { errorHandler } from 'helpers/error-handler';
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
 * controls which form is displayed to the patient
 * as in login, register, logout or reset password
 */
export function getPatients(pageNumber, firtsName, lastName, documentType, documentNumber, demographicData, sessionToken) {
  return (dispatch) => {
    dispatch(getPatientsRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => patientsRequest.init(token).getPatients(pageNumber, firtsName, lastName, documentType, documentNumber, demographicData))
      .then((data) => {
        dispatch(getPatientsSuccess(data));
      })
      .catch((error) => {
        dispatch(getPatientsFailure(errorHandler(error)));
      });
  };
}

/**
 * ## State actions
 * controls which form is displayed to the patient
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
        dispatch(getPatientFailure(errorHandler(error)));
      });
  };
}

export function onPatientFormClear() {
  return {
    type: ON_PATIENT_FORM_CLEAR,
  };
}

export function onPatientFormFieldChange(field, value) {
  return {
    type: ON_PATIENT_FORM_FIELD_CHANGE,
    payload: { field, value },
  };
}

export function patientUpdateRequest() {
  return {
    type: PATIENT_UPDATE_REQUEST,
  };
}

export function patientUpdateSuccess() {
  return {
    type: PATIENT_UPDATE_SUCCESS,
  };
}

export function patientUpdateFailure(data) {
  return {
    type: PATIENT_UPDATE_FAILURE,
    payload: data,
  };
}

/**
 * ## updatePatient
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, the server is called with the data to update
 * If successful, get the patient so that the screen is updated with
 * the data as now persisted on the serverx
 *
 */
export function updatePatient(
  originalPatient,
  firstName,
  lastName,
  address,
  phone,
  birthday,
  sex,
  medicalInsurance,
  documentType,
  documentNumber,
  refrigerator,
  electricity,
  pet,
  apartmentType,
  heatingType,
  waterType,
  sessionToken,
) {
  return (dispatch) => {
    dispatch(patientUpdateRequest());
    return authToken.getSessionToken(sessionToken)
      .then(token => patientsRequest.init(token)
        .updatePatient(originalPatient, {
          firstName,
          lastName,
          address,
          phone,
          birthday,
          sex,
          medicalInsurance,
          documentType,
          documentNumber,
          refrigerator,
          electricity,
          pet,
          apartmentType,
          heatingType,
          waterType,
        }))
      .then(() => {
        dispatch(patientUpdateSuccess());
        dispatch(getPatient(originalPatient));
      })
      .catch((error) => {
        dispatch(patientUpdateFailure(errorHandler(error)));
      });
  };
}

export function patientAddRequest() {
  return {
    type: PATIENT_ADD_REQUEST,
  };
}

export function patientAddSuccess() {
  return {
    type: PATIENT_ADD_SUCCESS,
  };
}

export function patientAddFailure(data) {
  return {
    type: PATIENT_ADD_FAILURE,
    payload: data,
  };
}

/**
 * ## addPatient
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, the server is called with the data to add
 * If successful, get the patient so that the screen is addd with
 * the data as now persisted on the serverx
 *
 */
export function addPatient(
  firstName,
  lastName,
  address,
  phone,
  birthday,
  sex,
  medicalInsurance,
  documentType,
  documentNumber,
  sessionToken,
) {
  return (dispatch) => {
    dispatch(patientAddRequest());
    return authToken.getSessionToken(sessionToken)
      .then(token => patientsRequest.init(token)
        .addPatient({
          firstName,
          lastName,
          address,
          phone,
          birthday,
          sex,
          medicalInsurance,
          documentType,
          documentNumber,
        }))
      .then(() => {
        dispatch(patientAddSuccess());
      })
      .catch((error) => {
        dispatch(patientAddFailure(errorHandler(error)));
      });
  };
}

export function patientDeleteRequest() {
  return {
    type: PATIENT_DELETE_REQUEST,
  };
}

export function patientDeleteSuccess() {
  return {
    type: PATIENT_DELETE_SUCCESS,
  };
}

export function patientDeleteFailure(data) {
  return {
    type: PATIENT_DELETE_FAILURE,
    payload: data,
  };
}

/**
 * ## deletePatient
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, the server is called with the data to delete
 *
 */
export function deletePatient(patientId, sessionToken) {
  return (dispatch) => {
    dispatch(patientDeleteRequest());
    return authToken.getSessionToken(sessionToken)
      .then(token => patientsRequest.init(token).deletePatient(patientId))
      .then(() => {
        dispatch(patientDeleteSuccess());
        dispatch(getPatients());
      })
      .catch((error) => {
        dispatch(patientDeleteFailure(errorHandler(error)));
      });
  };
}
