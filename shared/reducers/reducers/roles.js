
import {
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILURE,

  GET_ROL_REQUEST,
  GET_ROL_SUCCESS,
  GET_ROL_FAILURE,

  LOGOUT_SUCCESS,

  SET_STATE,
} from 'reducers/constants';

/**
 * ## Initial State
 *
 */
import InitialState from 'reducers/states/roles-state';

/**
 * ## rolesReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function rolesReducer(state = InitialState, action) {
  let nextRolState = null;

  switch (action.type) {
    /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */
    case GET_ROLES_REQUEST: {
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
    case GET_ROLES_SUCCESS: {
      return {
        ...state,
        roles: action.payload,
        isFetching: false,
        error: null,
      };
    }

    /**
     * User logged out, so reset form fields and original rol.
     *
     */
    case LOGOUT_SUCCESS: {
      return nextRolState = {
        ...state,
        roles: [],
        error: null,
      };
    }

    /**
     * ### Request fails
     * we're done fetching and the error needs to be displayed to the user
     */
    case GET_ROLES_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    }

    /**
     * ### Request starts
     */
    case GET_ROL_REQUEST: {
      return { ...state, isFetching: true, error: null };
    }

    case GET_ROL_SUCCESS: {
      nextRolState = {
        ...state,
        fields: {
          ...state.fields,
          name: action.payload.name,
        },
        originalRoles: {
          ...state.originalRoles,
          name: action.payload.name,
          permissions: action.payload.permissions,
        },
        isFetching: false,
        error: null,
      };

      return fieldValidation(nextRolState, action);
    }

    case GET_ROL_FAILURE: {
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
      const { roles } = JSON.parse(action.payload);

      return {
        ...state,
        disabled: state.roles.disabled,
        error: state.roles.error,
        isValid: state.roles.isValid,
        isFetching: state.roles.isFetching,
        roles: state.roles.roles,
      };
    }

    default: {
      return state;
    }
  }
}

