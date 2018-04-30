'use strict'

import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
} from '../constants';

import {profileRequest} from '../lib/request/profile-request';
import {authToken} from '../lib/store/auth-token';

/**
 * ## retreiving profile actions
 */
export function getProfileRequest() {
  return {
    type: GET_PROFILE_REQUEST
  };
}

export function getProfileSuccess(user) {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: user
  };
}

export function getProfileFailure(error) {
  return {
    type: GET_PROFILE_FAILURE,
    payload: error
  };
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getProfile(sessionToken) {
  return dispatch => {
    dispatch(getProfileRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then((token) => {
        return profileRequest.init(token).getProfile();
      })
      .then((json) => {
        dispatch(getProfileSuccess(json.user));
      })
      .catch((error) => {
        dispatch(getProfileFailure(error));
      });
  };
}
