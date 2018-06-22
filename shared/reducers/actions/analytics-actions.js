import {
  GET_DEMOGRAPHIC_DATA_ANALYTICS_REQUEST,
  GET_DEMOGRAPHIC_DATA_ANALYTICS_SUCCESS,
  GET_DEMOGRAPHIC_DATA_ANALYTICS_FAILURE,

  GET_HEALTH_CONTROLS_ANALYTICS_REQUEST,
  GET_HEALTH_CONTROLS_ANALYTICS_SUCCESS,
  GET_HEALTH_CONTROLS_ANALYTICS_FAILURE,
} from 'reducers/constants';

import { errorHandler } from 'helpers/error-handler';
import { analyticsRequest } from 'reducers/lib/request/analytics-request';
import { authToken } from 'reducers/lib/store/auth-token';

/**
 * ## retreiving profile actions
 */
export function getDemographicDataAnalyticsRequest() {
  return {
    type: GET_DEMOGRAPHIC_DATA_ANALYTICS_REQUEST,
  };
}

export function getDemographicDataAnalyticsSuccess(analytics) {
  return {
    type: GET_DEMOGRAPHIC_DATA_ANALYTICS_SUCCESS,
    payload: analytics,
  };
}

export function getDemographicDataAnalyticsFailure(error) {
  return {
    type: GET_DEMOGRAPHIC_DATA_ANALYTICS_FAILURE,
    payload: error,
  };
}


/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getDemographicDataAnalytics(sessionToken) {
  return (dispatch) => {
    dispatch(getDemographicDataAnalyticsRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => analyticsRequest.init(token).getDemographicDataAnalytics())
      .then((data) => {
        dispatch(getDemographicDataAnalyticsSuccess(data.demographicsDataAnalytics));
      })
      .catch((error) => {
        dispatch(getDemographicDataAnalyticsFailure(errorHandler(error)));
      });
  };
}


export function getHealthControlsAnalyticsRequest() {
  return {
    type: GET_HEALTH_CONTROLS_ANALYTICS_REQUEST,
  };
}

export function getHealthControlsAnalyticsSuccess(analytics) {
  return {
    type: GET_HEALTH_CONTROLS_ANALYTICS_SUCCESS,
    payload: analytics,
  };
}

export function getHealthControlsAnalyticsFailure(error) {
  return {
    type: GET_HEALTH_CONTROLS_ANALYTICS_FAILURE,
    payload: error,
  };
}


/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getHealthControlsAnalytics(patient, type, sessionToken) {
  return (dispatch) => {
    dispatch(getHealthControlsAnalyticsRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => analyticsRequest.init(token).getHealthControlsAnalytics(patient, type))
      .then((data) => {
        dispatch(getHealthControlsAnalyticsSuccess(data.healthControlsAnalytics));
      })
      .catch((error) => {
        dispatch(getHealthControlsAnalyticsFailure(errorHandler(error)));
      });
  };
}
