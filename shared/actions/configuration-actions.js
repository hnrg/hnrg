

import {
  GET_CONFIGURATION_REQUEST,
  GET_CONFIGURATION_SUCCESS,
  GET_CONFIGURATION_FAILURE,
} from '../constants';

import { configurationRequest } from '../lib/request/configuration-request';
import { authToken } from '../lib/store/auth-token';

/**
 * ## retreiving configuration actions
 */
export function getConfigurationRequest() {
  return {
    type: GET_CONFIGURATION_REQUEST,
  };
}

export function getConfigurationSuccess(configuration) {
  return {
    type: GET_CONFIGURATION_SUCCESS,
    payload: configuration,
  };
}

export function getConfigurationFailure(error) {
  return {
    type: GET_CONFIGURATION_FAILURE,
    payload: error,
  };
}

/**
 * ## State actions
 * controls which form is displayed to the configuration
 * as in login, register, logout or reset password
 */
export function getConfiguration() {
  return (dispatch) => {
    dispatch(getConfigurationRequest());
    return configurationRequest.getConfiguration()
      .then((json) => {
        dispatch(getConfigurationSuccess(json.configuration));
      })
      .catch((error) => {
        dispatch(getConfigurationFailure(error));
      });
  };
}
