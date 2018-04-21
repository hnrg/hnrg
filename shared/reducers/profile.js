import fieldValidation from '../lib/field-validation';
import formValidation from './auth-form';

import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,

  LOGOUT_SUCCESS,

  SET_STATE
} from '../constants';

/**
 * ## Initial State
 *
 */
import InitialState from '../states/profile-state';

/**
 * ## profileReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function profileReducer(state = InitialState, action) {
  let nextProfileState = null;

  switch (action.type) {
      /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */
    case GET_PROFILE_REQUEST:
      return {...state, isFetching: true, error: null, };

      /**
     * ### Request ends successfully
     *
     * the fetching is done, set the UI fields and the originalProfile
     *
     * Validate the data to make sure it's all good and someone didn't
     * mung it up through some other mechanism
     */
    case GET_PROFILE_SUCCESS:
      nextProfileState = {
        ...state,
        fields: {
          ...state.fields,
          email: action.payload.email,
          username: action.payload.username,
        },
        originalProfile: {
          ...state.originalProfile,
          email: action.payload.email,
          username: action.payload.username,
        },
        isFetching: false,
        error: null,
      };

      return formValidation(fieldValidation(nextProfileState, action), action);

      /**
     * User logged out, so reset form fields and original profile.
     *
     */
    case LOGOUT_SUCCESS:
      nextProfileState = {
          ...state,
          email: '',
          error: null,
      };

      return formValidation(nextProfileState, action);

      /**
     * ### Request fails
     * we're done fetching and the error needs to be displayed to the user
     */
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

      /**
     * ### set the state
     *
     * This is in support of Hot Loading - take the payload
     * and set the values into the state
     *
     */
    case SET_STATE:
      var profile = JSON.parse(action.payload).profile;
      var {fields, originalProfile} = state;

      return {
        ...state,
        disabled: profile.disabled,
        error: profile.error,
        isValid: profile.isValid,
        isFetching: profile.isFetching,
        fields: {
          ...fields,
          email: profile.fields.email,
          emailHasError: profile.fields.emailHasError,
          username: profile.fields.username,
          usernameHasError: profile.fields.usernameHasError,
        },
        originalProfile: {
          ...originalProfile,
          email: profile.originalProfile.email,
          username: profile.originalProfile.username,
        },
      };
  }

  return state;
}
