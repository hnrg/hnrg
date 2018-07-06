import {
  GET_HEALTH_CONTROLS_REQUEST,
  GET_HEALTH_CONTROLS_SUCCESS,
  GET_HEALTH_CONTROLS_FAILURE,

  GET_HEALTH_CONTROL_REQUEST,
  GET_HEALTH_CONTROL_SUCCESS,
  GET_HEALTH_CONTROL_FAILURE,

  HEALTH_CONTROL_ADD_REQUEST,
  HEALTH_CONTROL_ADD_SUCCESS,
  HEALTH_CONTROL_ADD_FAILURE,

  HEALTH_CONTROL_DELETE_REQUEST,
  HEALTH_CONTROL_DELETE_SUCCESS,
  HEALTH_CONTROL_DELETE_FAILURE,

  HEALTH_CONTROL_ENABLE_REQUEST,
  HEALTH_CONTROL_ENABLE_SUCCESS,
  HEALTH_CONTROL_ENABLE_FAILURE,

  HEALTH_CONTROL_UPDATE_REQUEST,
  HEALTH_CONTROL_UPDATE_SUCCESS,
  HEALTH_CONTROL_UPDATE_FAILURE,

  ON_HEALTH_CONTROL_FORM_CLEAR,
  ON_HEALTH_CONTROL_FORM_FIELD_CHANGE,
} from 'reducers/constants';

import errorHandler from 'helpers/error-handler';
import { healthControlsRequest } from 'reducers/lib/request/health-controls-request';
import { authToken } from 'reducers/lib/store/auth-token';

/**
 * ## retreiving profile actions
 */
export function getHealthControlsRequest() {
  return {
    type: GET_HEALTH_CONTROLS_REQUEST,
  };
}

export function getHealthControlsSuccess(data) {
  return {
    type: GET_HEALTH_CONTROLS_SUCCESS,
    payload: data,
  };
}

export function getHealthControlsFailure(error) {
  return {
    type: GET_HEALTH_CONTROLS_FAILURE,
    payload: error,
  };
}

export function getHealthControlRequest() {
  return {
    type: GET_HEALTH_CONTROL_REQUEST,
  };
}

export function getHealthControlSuccess(healthControl) {
  return {
    type: GET_HEALTH_CONTROL_SUCCESS,
    payload: healthControl,
  };
}

export function getHealthControlFailure(error) {
  return {
    type: GET_HEALTH_CONTROL_FAILURE,
    payload: error,
  };
}

/**
 * ## State actions
 * controls which form is displayed to the healthControl
 * as in login, register, logout or reset password
 */
export function getHealthControls(pageNumber, sessionToken) {
  return (dispatch) => {
    dispatch(getHealthControlsRequest());
    // store or get a sessionTokens
    return authToken.getSessionToken(sessionToken)
      .then(token => healthControlsRequest.init(token).getHealthControls(pageNumber))
      .then((data) => {
        dispatch(getHealthControlsSuccess(data));
      })
      .catch((error) => {
        dispatch(getHealthControlsFailure(errorHandler(error)));
      });
  };
}

export function getHealthControl(healthControl, sessionToken) {
  return (dispatch) => {
    dispatch(getHealthControlRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => healthControlsRequest.init(token).getHealthControl(healthControl))
      .then((data) => {
        dispatch(getHealthControlSuccess(data.healthControl));
      })
      .catch((error) => {
        dispatch(getHealthControlFailure(errorHandler(error)));
      });
  };
}

export function onHealthControlFormFieldChange(field, value) {
  return {
    type: ON_HEALTH_CONTROL_FORM_FIELD_CHANGE,
    payload: { field, value },
  };
}

export function onHealthControlFormClear() {
  return {
    type: ON_HEALTH_CONTROL_FORM_CLEAR,
  };
}

export function healthControlAddRequest() {
  return {
    type: HEALTH_CONTROL_ADD_REQUEST,
  };
}

export function healthControlAddSuccess() {
  return {
    type: HEALTH_CONTROL_ADD_SUCCESS,
  };
}

export function healthControlAddFailure(data) {
  return {
    type: HEALTH_CONTROL_ADD_FAILURE,
    payload: data,
  };
}

/**
 * ## addHealthControl
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, the server is called with the data to add
 * If successful, get the healthControl so that the screen is updated with
 * the data as now persisted on the serverx
 *
 */
export function addHealthControl(
  patient,
  date,
  weight,
  pc,
  ppc,
  height,
  completeVaccines,
  vaccinesObservations,
  accordingMaturationContext,
  maturationObservations,
  commonPhysicalExamination,
  physicalExaminationObservations,
  feeding,
  generalObservations,
  sessionToken,
) {
  return (dispatch) => {
    dispatch(healthControlAddRequest());
    return authToken.getSessionToken(sessionToken)
      .then(token => healthControlsRequest.init(token)
        .addHealthControl({
          patient,
          date,
          weight,
          pc,
          ppc,
          height,
          completeVaccines,
          vaccinesObservations,
          accordingMaturationContext,
          maturationObservations,
          commonPhysicalExamination,
          physicalExaminationObservations,
          feeding,
          generalObservations,
        }))
      .then(() => {
        dispatch(healthControlAddSuccess());
      })
      .catch((error) => {
        dispatch(healthControlAddFailure(errorHandler(error)));
      });
  };
}

export function healthControlUpdateRequest() {
  return {
    type: HEALTH_CONTROL_UPDATE_REQUEST,
  };
}

export function healthControlUpdateSuccess() {
  return {
    type: HEALTH_CONTROL_UPDATE_SUCCESS,
  };
}

export function healthControlUpdateFailure(data) {
  return {
    type: HEALTH_CONTROL_UPDATE_FAILURE,
    payload: data,
  };
}

/**
 * ## updateHealthControl
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, the server is called with the data to update
 * If successful, get the healthControl so that the screen is updated with
 * the data as now persisted on the serverx
 *
 */
export function updateHealthControl(
  originalHealthControl,
  date,
  weight,
  pc,
  ppc,
  height,
  completeVaccines,
  vaccinesObservations,
  accordingMaturationContext,
  maturationObservations,
  commonPhysicalExamination,
  physicalExaminationObservations,
  feeding,
  generalObservations,
  sessionToken,
) {
  return (dispatch) => {
    dispatch(healthControlUpdateRequest());
    return authToken.getSessionToken(sessionToken)
      .then(token => healthControlsRequest.init(token)
        .updateHealthControl(originalHealthControl, {
          date,
          weight,
          pc,
          ppc,
          height,
          completeVaccines,
          vaccinesObservations,
          accordingMaturationContext,
          maturationObservations,
          commonPhysicalExamination,
          physicalExaminationObservations,
          feeding,
          generalObservations,
        }))
      .then(() => {
        dispatch(healthControlUpdateSuccess());
        dispatch(getHealthControl(originalHealthControl));
      })
      .catch((error) => {
        dispatch(healthControlUpdateFailure(errorHandler(error)));
      });
  };
}

export function healthControlDeleteRequest() {
  return {
    type: HEALTH_CONTROL_DELETE_REQUEST,
  };
}

export function healthControlDeleteSuccess() {
  return {
    type: HEALTH_CONTROL_DELETE_SUCCESS,
  };
}

export function healthControlDeleteFailure(data) {
  return {
    type: HEALTH_CONTROL_DELETE_FAILURE,
    payload: data,
  };
}

export function deleteHealthControl(healthControl, sessionToken) {
  return (dispatch) => {
    dispatch(healthControlDeleteRequest());
    return authToken.getSessionToken(sessionToken)
      .then(token => healthControlsRequest.init(token).deleteHealthControl(healthControl))
      .then(() => {
        dispatch(healthControlDeleteSuccess());
        dispatch(getHealthControls());
      })
      .catch((error) => {
        dispatch(healthControlDeleteFailure(errorHandler(error)));
      });
  };
}

export function healthControlEnableRequest() {
  return {
    type: HEALTH_CONTROL_ENABLE_REQUEST,
  };
}

export function healthControlEnableSuccess() {
  return {
    type: HEALTH_CONTROL_ENABLE_SUCCESS,
  };
}

export function healthControlEnableFailure(data) {
  return {
    type: HEALTH_CONTROL_ENABLE_FAILURE,
    payload: data,
  };
}

export function enableHealthControl(healthControl, sessionToken) {
  return (dispatch) => {
    dispatch(healthControlEnableRequest());
    return authToken.getSessionToken(sessionToken)
      .then(token => healthControlsRequest.init(token).enableHealthControl(healthControl))
      .then(() => {
        dispatch(healthControlEnableSuccess());
        dispatch(getHealthControls());
      })
      .catch((error) => {
        dispatch(healthControlEnableFailure(errorHandler(error)));
      });
  };
}
