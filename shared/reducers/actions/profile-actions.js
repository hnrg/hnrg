import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,

  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,

  ON_PROFILE_FORM_FIELD_CHANGE,
} from 'reducers/constants';

import { profileRequest } from 'reducers/lib/request/profile-request';
import { authToken } from 'reducers/lib/store/auth-token';

/**
 * ## retreiving profile actions
 */
export function getProfileRequest() {
  return {
    type: GET_PROFILE_REQUEST,
  };
}

export function getProfileSuccess(user) {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: user,
  };
}

export function getProfileFailure(error) {
  return {
    type: GET_PROFILE_FAILURE,
    payload: error,
  };
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getProfile(sessionToken) {
  return (dispatch) => {
    dispatch(getProfileRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => profileRequest.init(token).getProfile())
      .then((json) => {
        dispatch(getProfileSuccess(json.user));
      })
      .catch((error) => {
        dispatch(getProfileFailure(error));
      });
  };
}

export function onProfileFormFieldChange(field, value) {
  return {
    type: ON_PROFILE_FORM_FIELD_CHANGE,
    payload: { field, value }
  }
}

export function profileUpdateRequest() {
  return {
    type: PROFILE_UPDATE_REQUEST
  };
}

export function profileUpdateSuccess() {
  return {
    type: PROFILE_UPDATE_SUCCESS
  };
}

export function profileUpdateFailure(json) {
  return {
    type: PROFILE_UPDATE_FAILURE,
    payload: json
  };
}

/**
 * ## updateProfile
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, the server is called with the data to update
 * If successful, get the profile so that the screen is updated with
 * the data as now persisted on the serverx
 *
 */
export function updateProfile(originalUsername, username, email, firstName, lastName, sessionToken) {
  return dispatch => {
    dispatch(profileUpdateRequest());
    return authToken.getSessionToken(sessionToken)
      .then(token => {
        return profileRequest.init(token)
          .updateProfile({
            username,
            email,
            firstName,
            lastName,
          });
      })
      .then(() => {
        dispatch(profileUpdateSuccess());
        dispatch(getProfile());
      })
      .catch((error) => {
        dispatch(profileUpdateFailure(error));
      });
  };
}