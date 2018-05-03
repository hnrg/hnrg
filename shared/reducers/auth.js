import InitialState from '../states/auth-state';
import fieldValidation from '../lib/field-validation';
import formValidation from './auth-form';
import {
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,

  LOGOUT,
  LOGIN,
  FORGOT_PASSWORD,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  ON_AUTH_FORM_FIELD_CHANGE,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,

  SET_STATE,
} from '../constants';

/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function (state = InitialState, action) {
  switch (action.type) {
    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
    case SESSION_TOKEN_REQUEST:
    case LOGOUT_REQUEST:
    case LOGIN_REQUEST:
    case RESET_PASSWORD_REQUEST:
    {
      const nextState = {
        ...state,
        isFetching: true,
        error: null,
      };

      return nextState;
    }

    /**
       * ### Logout state
       * The logged in user logs out
       * Clear the form's error and all the fields
       */
    case LOGOUT:
      var fields = state.fields;
      return {
        ...state,
        state: action.type,
        error: null,
        fields: {
          ...fields,
          email: '',
          password: '',
        },
      };

      /**
       * ### Loggin in state
       * The user isn't logged in, and needs to
       * login, register or reset password
       *
       * Set the form state and clear any errors
       */
    case LOGIN:
    case FORGOT_PASSWORD:
      return formValidation({
        ...state,
        state: action.type,
        error: null,
      });

      /**
       * ### Auth form field change
       *
       * Set the form's field with the value
       * Clear the forms error
       * Pass the fieldValidation results to the
       * the formValidation
       */
    case ON_AUTH_FORM_FIELD_CHANGE:
    {
      const { field, value } = action.payload;

      const nextState = {
        ...state,
        error: null,
      };

      nextState[field] = value;

      return formValidation(fieldValidation(nextState, action), action);
    }
    /**
       * ### Requests end, good or bad
       * Set the fetching flag so the forms will be enabled
       */
    case SESSION_TOKEN_SUCCESS:
    case SESSION_TOKEN_FAILURE:
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };

      /**
       *
       * The fetching is done, but save the error
       * for display to the user
       */
    case LOGOUT_FAILURE:
    case LOGIN_FAILURE:
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

      /**
       * ### Hot Loading support
       *
       * Set all the field values from the payload
       */
    case SET_STATE:
      var auth = JSON.parse(action.payload).auth;
      var { fields } = auth;

      return {
        ...state,
        state: auth.state,
        disabled: auth.disabled,
        error: auth.error,
        isValid: auth.isValid,
        isFetching: auth.isFetching,
        fields: {
          ...fields,
          email: auth.email,
          emailHasError: auth.emailHasError,
          password: auth.password,
          passwordHasError: auth.passwordHasError,
        },
      };

    case DELETE_TOKEN_REQUEST:
    case DELETE_TOKEN_SUCCESS:
      return state;
  }

  return state;
}
