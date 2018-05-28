import fieldValidation from 'reducers/lib/field-validation/users';
import formValidation from './users-form';

import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,

  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,

  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,

  ON_USER_FORM_FIELD_CHANGE,

  LOGOUT_SUCCESS,

  SET_STATE,
} from 'reducers/constants';

/**
 * ## Initial State
 *
 */
import InitialState from 'reducers/states/users-state';

/**
 * ## usersReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function usersReducer(state = InitialState, action) {
  let nextUserState = null;

  switch (action.type) {
    /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */
    case GET_USERS_REQUEST:
    case GET_USER_REQUEST:
    case USER_UPDATE_REQUEST:
    {
      return { ...state, isFetching: true, error: null };
    }

    /**
     * ### Request ends successfully
     *
     * the fetching is done, set the UI fields and the originalRoles
     *
     * Validate the data to make sure it's all good and someone didn't
     * mung it up through some other mechanism
     */
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload,
        isFetching: false,
        error: null,
      };
    }

    case USER_UPDATE_SUCCESS: {
      return { ...state, isFetching: false };
    }

    /**
     * ### Request ends successfully
     *
     * the fetching is done, set the UI fields and the originalUser
     *
     * Validate the data to make sure it's all good and someone didn't
     * mung it up through some other mechanism
     */
    case GET_USER_SUCCESS: {
      nextUserState = {
        ...state,
        fields: {
          ...state.fields,
          email: action.payload.email,
          username: action.payload.username,
          email: action.payload.email,
          username: action.payload.username,
          firstName: action.payload.firstName || '',
          lastName: action.payload.lastName || '',
        },
        originalUser: {
          ...state.originalUser,
          email: action.payload.email,
          username: action.payload.username,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          active: action.payload.active,
          createdAt: action.payload.createdAt,
          updatedAt: action.payload.updatedAt,
          roles: action.payload.roles,
        },
        isFetching: false,
        error: null,
      };

      return formValidation(fieldValidation(nextUserState, action), action);
    }

    case ON_USER_FORM_FIELD_CHANGE: {
      const { field, value } = action.payload;

      nextUserState = {
        ...state,
        fields: {
          ...state.fields,
          [field]: value,
        },
      };

      return formValidation(fieldValidation(nextUserState, action), action);
    }

    /**
     * User logged out, so reset form fields and original users.
     *
     */
    case LOGOUT_SUCCESS: {
      nextUserState = {
        ...state,
        email: '',
        error: null,
      };

      return formValidation(nextUserState, action);
    }

    /**
     * ### Request fails
     * we're done fetching and the error needs to be displayed to the user
     */
    case GET_USERS_FAILURE:
    case GET_USER_FAILURE:
    case USER_UPDATE_FAILURE:
    {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    }

    /**
     * ### set the state
     *
     * This is in support of Hot Loading - take the payload
     * and set the values into the state
     *
     */
    case SET_STATE: {
      const { users } = JSON.parse(action.payload);
      const { fields, originalUser } = state;

      return {
        ...state,
        users: users.users,
        disabled: users.disabled,
        error: users.error,
        isValid: users.isValid,
        isFetching: users.isFetching,
        fields: {
          ...fields,
          email: users.fields.email,
          emailHasError: users.fields.emailHasError,
          username: users.fields.username,
          usernameHasError: users.fields.usernameHasError,
          firstName: users.fields.firstName,
          firstNameHasError: users.fields.firstNameHasError,
          lastName: users.fields.lastName,
          lastNameHasError: users.fields.lastNameHasError,
        },
        originalUser: {
          ...originalUser,
          email: users.originalUser.email,
          username: users.originalUser.username,
          firstName: users.originalUser.firstName,
          lastName: users.originalUser.lastName,
          active: users.originalUser.active,
          createdAt: users.originalUser.createdAt,
          updatedAt: users.originalUser.updatedAt,
          roles: users.originalUser.roles,
        },
      };
    }

    default: {
      return state;
    }
  }
}
