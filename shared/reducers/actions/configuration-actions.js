import {
  GET_CONFIGURATION_REQUEST,
  GET_CONFIGURATION_SUCCESS,
  GET_CONFIGURATION_FAILURE,

  CONFIGURATION_ADD_REQUEST,
  CONFIGURATION_ADD_SUCCESS,
  CONFIGURATION_ADD_FAILURE,

  ON_CONFIGURATION_FORM_FIELD_CHANGE,
} from 'reducers/constants';

import { configurationRequest } from 'reducers/lib/request/configuration-request';
import { authToken } from 'reducers/lib/store/auth-token';

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
      .then((data) => {
        dispatch(getConfigurationSuccess(data.configuration));
      })
      .catch((error) => {
        dispatch(getConfigurationFailure(error.response.data.error || error.response.data));
      });
  };
}

export function onConfigurationFormFieldChange(field, value) {
  return {
    type: ON_CONFIGURATION_FORM_FIELD_CHANGE,
    payload: { field, value },
  };
}

export function configurationAddRequest() {
  return {
    type: CONFIGURATION_ADD_REQUEST,
  };
}

export function configurationAddSuccess() {
  return {
    type: CONFIGURATION_ADD_SUCCESS,
  };
}

export function configurationAddFailure(data) {
  return {
    type: CONFIGURATION_ADD_FAILURE,
    payload: data,
  };
}

/**
 * ## addConfiguration
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, the server is called with the data to add
 * If successful, get the configuration so that the screen is addd with
 * the data as now persisted on the serverx
 *
 */
export function addConfiguration(
  name,
  amountPerPage,
  email,
  description,
  from,
  delta,
  amount,
  maintenance,
  sessionToken,
) {
  return (dispatch) => {
    dispatch(configurationAddRequest());
    return authToken.getSessionToken(sessionToken)
      .then(token => configurationRequest.init(token)
        .addConfiguration({
          name,
          amountPerPage,
          email,
          description,
          from,
          delta,
          amount,
          maintenance,
        }))
      .then(() => {
        dispatch(configurationAddSuccess());
        dispatch(getConfiguration());
      })
      .catch((error) => {
        dispatch(configurationAddFailure(error.response.data.error || error.response.data));
      });
  };
}
