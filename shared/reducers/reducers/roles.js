import fieldValidation from 'reducers/lib/field-validation/roles';
import formValidation from 'reducers/lib/form-validation/roles';

import {
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILURE,

  GET_ROL_REQUEST,
  GET_ROL_SUCCESS,
  GET_ROL_FAILURE,

  ROL_ADD_REQUEST,
  ROL_ADD_SUCCESS,
  ROL_ADD_FAILURE,

  ROL_DELETE_REQUEST,
  ROL_DELETE_SUCCESS,
  ROL_DELETE_FAILURE,

  ROL_ENABLE_REQUEST,
  ROL_ENABLE_SUCCESS,
  ROL_ENABLE_FAILURE,

  ROL_PERMISSION_DELETE_REQUEST,
  ROL_PERMISSION_DELETE_SUCCESS,
  ROL_PERMISSION_DELETE_FAILURE,

  ROL_UPDATE_REQUEST,
  ROL_UPDATE_SUCCESS,
  ROL_UPDATE_FAILURE,

  ON_ROL_FORM_FIELD_CHANGE,

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
    case GET_ROLES_REQUEST:
    case GET_ROL_REQUEST:
    case ROL_ADD_REQUEST:
    case ROL_DELETE_REQUEST:
    case ROL_ENABLE_REQUEST:
    case ROL_PERMISSION_DELETE_REQUEST:
    case ROL_UPDATE_REQUEST:
    {
      return { ...state, isFetching: true, error: null };
    }

    /**
     * ### Request ends successfully
     *
     * the fetching is done, set the UI fields and the originalRol
     *
     * Validate the data to make sure it's all good and someone didn't
     * mung it up through some other mechanism
     */
    case GET_ROLES_SUCCESS: {
      return {
        ...state,
        totalCount: action.payload.totalCount,
        count: action.payload.count,
        roles: action.payload.roles,
        isFetching: false,
        error: null,
      };
    }

    case ROL_ADD_SUCCESS:
    case ROL_DELETE_SUCCESS:
    case ROL_ENABLE_SUCCESS:
    case ROL_PERMISSION_DELETE_SUCCESS:
    case ROL_UPDATE_SUCCESS:
    {
      return {
        ...state,
        isFetching: false,
        totalCount: 0,
        count: 0,
        roles: null,
        success: true,
      };
    }

    /**
     * Rol logged out, so reset form fields and original rol.
     *
     */
    case LOGOUT_SUCCESS: {
      return nextRolState = {
        ...state,
        roles: [],
        error: null,
        success: null,
      };
    }

    /**
     * ### Request fails
     * we're done fetching and the error needs to be displayed to the user
     */
    case GET_ROLES_FAILURE:
    case GET_ROL_FAILURE:
    case ROL_ADD_FAILURE:
    case ROL_DELETE_FAILURE:
    case ROL_ENABLE_FAILURE:
    case ROL_PERMISSION_DELETE_FAILURE:
    case ROL_UPDATE_FAILURE:
    {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        success: null,
      };
    }

    case GET_ROL_SUCCESS: {
      nextRolState = {
        ...state,
        fields: {
          ...state.fields,
          name: action.payload.name,
          permissions: action.payload.permissions.map(p => p.name),
        },
        originalRol: {
          ...state.originalRol,
          name: action.payload.name,
          permissions: action.payload.permissions,
        },
        isFetching: false,
        error: null,
      };

      return fieldValidation(nextRolState, action);
    }

    case ON_ROL_FORM_FIELD_CHANGE: {
      const { field, value } = action.payload;

      nextRolState = {
        ...state,
        success: null,
        fields: {
          ...state.fields,
          [field]: value,
        },
      };

      return formValidation(fieldValidation(nextRolState, action), action);
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
        disabled: roles.disabled,
        error: roles.error,
        success: roles.success,
        isValid: roles.isValid,
        isFetching: roles.isFetching,
        originalRol: roles.originalRol,
        fields: roles.fields,
        totalCount: roles.totalCount,
        count: roles.count,
        roles: roles.roles,
      };
    }

    default: {
      return state;
    }
  }
}
