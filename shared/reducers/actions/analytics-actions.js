import {
  GET_DEMOGRAPHIC_DATA_ANALYTICS_REQUEST,
  GET_DEMOGRAPHIC_DATA_ANALYTICS_SUCCESS,
  GET_DEMOGRAPHIC_DATA_ANALYTICS_FAILURE,
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
