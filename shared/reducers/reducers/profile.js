import fieldValidation from 'reducers/lib/field-validation/profile';
import formValidation from 'reducers/lib/form-validation/profile';

import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,

  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,

  ON_PROFILE_FORM_FIELD_CHANGE,

  LOGOUT_SUCCESS,

  SET_STATE,
} from 'reducers/constants';

/**
 * ## Initial State
 *
 */
import InitialState from 'reducers/states/profile-state';

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
    case PROFILE_UPDATE_REQUEST:
    {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }

    case PROFILE_UPDATE_SUCCESS:
    {
      return {
        ...state,
        isFetching: false,
        success: true,
      };
    }

    /**
       * ### Request ends successfully
       *
       * the fetching is done, set the UI fields and the originalProfile
       *
       * Validate the data to make sure it's all good and someone didn't
       * mung it up through some other mechanism
       */
    case GET_PROFILE_SUCCESS:
    {
      nextProfileState = {
        ...state,
        fields: {
          ...state.fields,
          email: action.payload.email,
          username: action.payload.username,
          firstName: action.payload.firstName || '',
          lastName: action.payload.lastName || '',
          password: '',
        },
        originalProfile: {
          ...state.originalProfile,
          email: action.payload.email,
          username: action.payload.username,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          password: action.payload.password,
          active: action.payload.active,
          createdAt: action.payload.createdAt,
          updatedAt: action.payload.updatedAt,
          roles: action.payload.roles,
        },
        isFetching: false,
        error: null,
      };

      return formValidation(fieldValidation(nextProfileState, action), action);
    }

    case ON_PROFILE_FORM_FIELD_CHANGE:
    {
      const {
        field,
        value,
      } = action.payload;

      nextProfileState = {
        ...state,
        success: null,
        fields: {
          ...state.fields,
          [field]: value,
        },
      };

      return formValidation(fieldValidation(nextProfileState, action), action);
    }

    /**
       * User logged out, so reset form fields and original profile.
       *
       */
    case LOGOUT_SUCCESS:
    {
      return InitialState;
    }

    /**
       * ### Request fails
       * we're done fetching and the error needs to be displayed to the user
       */
    case GET_PROFILE_FAILURE:
    case PROFILE_UPDATE_FAILURE:
    {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        success: null,
      };
    }

    /**
       * ### set the state
       *
       * This is in support of Hot Loading - take the payload
       * and set the values into the state
       *
       */
    case SET_STATE:
    {
      const {
        profile,
      } = JSON.parse(action.payload);
      const {
        fields,
        originalProfile,
      } = state;

      return {
        ...state,
        disabled: profile.disabled,
        error: profile.error,
        success: profile.success,
        isValid: profile.isValid,
        isFetching: profile.isFetching,
        fields: {
          ...fields,
          email: profile.fields.email,
          emailHasError: profile.fields.emailHasError,
          username: profile.fields.username,
          usernameHasError: profile.fields.usernameHasError,
          password: profile.fields.password,
          passwordHasError: profile.fields.passwordHasError,
          firstName: profile.fields.firstName,
          firstNameHasError: profile.fields.firstNameHasError,
          lastName: profile.fields.lastName,
          lastNameHasError: profile.fields.lastNameHasError,
        },
        originalProfile: {
          ...originalProfile,
          email: profile.originalProfile.email,
          username: profile.originalProfile.username,
          firstName: profile.originalProfile.firstName,
          lastName: profile.originalProfile.lastName,
          password: profile.originalProfile.password,
          active: profile.originalProfile.active,
          createdAt: profile.originalProfile.createdAt,
          updatedAt: profile.originalProfile.updatedAt,
          roles: profile.originalProfile.roles,
        },
      };
    }

    default:
    {
      return state;
    }
  }
}
