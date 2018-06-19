import {
  GET_SINGLE_DEMOGRAPHIC_DATA_REQUEST,
  GET_SINGLE_DEMOGRAPHIC_DATA_REQUEST,
  GET_SINGLE_DEMOGRAPHIC_DATA_SUCCESS,

  GET_DEMOGRAPHIC_DATA_FAILURE,
  GET_DEMOGRAPHIC_DATA_SUCCESS,
  GET_DEMOGRAPHIC_DATA_FAILURE,

  DEMOGRAPHIC_DATA_ADD_REQUEST,
  DEMOGRAPHIC_DATA_ADD_SUCCESS,
  DEMOGRAPHIC_DATA_ADD_FAILURE,

  DEMOGRAPHIC_DATA_UPDATE_REQUEST,
  DEMOGRAPHIC_DATA_UPDATE_SUCCESS,
  DEMOGRAPHIC_DATA_UPDATE_FAILURE,

  ON_DEMOGRAPHIC_DATA_FORM_FIELD_CHANGE,
} from 'reducers/constants';

import { demographicDataRequest } from 'reducers/lib/request/demographic-data-request';
import { authToken } from 'reducers/lib/store/auth-token';

export function getSingleDemographicDataRequest() {
  return {
    type: GET_SINGLE_DEMOGRAPHIC_DATA_REQUEST,
  };
}

export function getSingleDemographicDataSuccess(demographicData) {
  return {
    type: GET_SINGLE_DEMOGRAPHIC_DATA_SUCCESS,
    payload: demographicData,
  };
}

export function getSingleDemographicDataFailure(error) {
  return {
    type: GET_SINGLE_DEMOGRAPHIC_DATA_FAILURE,
    payload: error,
  };
}

export function getSingleDemographicData(demographicDataId, sessionToken) {
  return (dispatch) => {
    dispatch(getSingleDemographicDataRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => demographicDataRequest.init(token).getSingleDemographicData(demographicDataId))
      .then((data) => {
        dispatch(getSingleDemographicDataSuccess(data.demographicData));
      })
      .catch((error) => {
        dispatch(getSingleDemographicDataFailure(error.response.data.error));
      });
  };
}

/**
 * ## retreiving profile actions
 */
export function getDemographicDataRequest() {
  return {
    type: GET_DEMOGRAPHIC_DATA_REQUEST,
  };
}

export function getDemographicDataSuccess(demographicData) {
  return {
    type: GET_DEMOGRAPHIC_DATA_SUCCESS,
    payload: demographicData,
  };
}

export function getDemographicDataFailure(error) {
  return {
    type: GET_DEMOGRAPHIC_DATA_FAILURE,
    payload: error,
  };
}

/**
 * ## State actions
 * contdemographic-datas which form is displayed to the demographic-data
 * as in login, register, logout or reset password
 */
export function getDemographicData(pageNumber, sessionToken) {
  return (dispatch) => {
    dispatch(getDemographicDataRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => demographicDataRequest.init(token).getDemographicData(pageNumber))
      .then((data) => {
        dispatch(getDemographicDataSuccess(data));
      })
      .catch((error) => {
        dispatch(getDemographicDataFailure(error.response.data.error));
      });
  };
}

export function onDemographicDataFormFieldChange(field, value) {
  return {
    type: ON_DEMOGRAPHIC_DATA_FORM_FIELD_CHANGE,
    payload: { field, value },
  };
}

export function demographicDataUpdateRequest() {
  return {
    type: DEMOGRAPHIC_DATA_UPDATE_REQUEST,
  };
}

export function demographicDataUpdateSuccess() {
  return {
    type: DEMOGRAPHIC_DATA_UPDATE_SUCCESS,
  };
}

export function demographicDataUpdateFailure(error) {
  return {
    type: DEMOGRAPHIC_DATA_UPDATE_FAILURE,
    payload: error,
  };
}

/**
 * ## updateDemographicData
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, the server is called with the data to update
 * If successful, get the demographic-data so that the screen is updated with
 * the data as now persisted on the serverx
 *
 */
export function updateDemographicData(originalDemographicData, sessionToken) {
  return (dispatch) => {
    dispatch(demographicDataUpdateRequest());
    return authToken.getSessionToken(sessionToken)
      .then(token => demographic-dataRequest.init(token)
        .updateRol(originalRolname, {
          name,
        }))
      .then(() => {
        dispatch(demographic-dataUpdateSuccess());
        dispatch(getRol(name));
      })
      .catch((error) => {
        dispatch(demographic-dataUpdateFailure(error.response.data.error));
      });
  };
}

export function demographicDataDeleteRequest() {
  return {
    type: DEMOGRAPHIC_DATA_DELETE_REQUEST,
  };
}

export function demographicDataDeleteSuccess() {
  return {
    type: DEMOGRAPHIC_DATA_DELETE_SUCCESS,
  };
}

export function demographicDataDeleteFailure(data) {
  return {
    type: DEMOGRAPHIC_DATA_DELETE_FAILURE,
    payload: data,
  };
}

