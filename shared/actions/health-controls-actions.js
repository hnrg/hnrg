import {
  GET_HEALTH_CONTROL_REQUEST,
  GET_HEALTH_CONTROL_SUCCESS,
  GET_HEALTH_CONTROL_FAILURE,

  GET_HEALTH_CONTROLS_REQUEST,
  GET_HEALTH_CONTROLS_SUCCESS,
  GET_HEALTH_CONTROLS_FAILURE,
} from '../constants';

import { healthControlsRequest } from '../lib/request/health-controls-request';
import { authToken } from '../lib/store/auth-token';

/**
 * ## retreiving profile actions
 */
export function getHealthControlsRequest() {
  return {
    type: GET_HEALTH_CONTROLS_REQUEST,
  };
}

export function getHealthControlsSuccess(healthControls) {
  return {
    type: GET_HEALTH_CONTROLS_SUCCESS,
    payload: healthControls,
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
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getHealthControls(sessionToken) {
  return (dispatch) => {
    dispatch(getHealthControlsRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => healthControlsRequest.init(token).getHealthControls())
      .then((json) => {
        dispatch(getHealthControlsSuccess(json.healthControls));
      })
      .catch((error) => {
        dispatch(getHealthControlsFailure(error));
      });
  };
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getHealthControl(sessionToken, healthControl) {
  return (dispatch) => {
    dispatch(getHealthControlRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => healthControlsRequest.init(token).getHealthControl(healthControl))
      .then((json) => {
        dispatch(getHealthControlSuccess(json.healthControl));
      })
      .catch((error) => {
        dispatch(getHealthControlFailure(error));
      });
  };
}

