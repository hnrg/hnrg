import {
  GET_PERMISSIONS_REQUEST,
  GET_PERMISSIONS_SUCCESS,
  GET_PERMISSIONS_FAILURE,

  LOGOUT_SUCCESS,

  SET_STATE,
} from 'reducers/constants';

/**
 * ## Initial State
 *
 */
import InitialState from 'reducers/states/permissions-state';

/**
 * ## permissionsReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function permissionsReducer(state = InitialState, action) {
  let nextPermissionState = null;

  switch (action.type) {
    /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */
    case GET_PERMISSIONS_REQUEST:
      {
        return { ...state,
          isFetching: true,
          error: null
        };
      }

      /**
       * ### Request ends successfully
       *
       * the fetching is done, set the UI fields and the originalPermissions
       *
       * Validate the data to make sure it's all good and someone didn't
       * mung it up through some other mechanism
       */
    case GET_PERMISSIONS_SUCCESS:
      {
        return {
          ...state,
          permissions: action.payload,
          isFetching: false,
          error: null,
        };
      }

      /**
       * User logged out, so reset form fields and original permission.
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
    case GET_PERMISSIONS_FAILURE:
      {
        return {
          ...state,
          isFetching: false,
          error: action.payload,
        };
      }


    case SET_STATE:
      {
        const {
          permissions
        } = JSON.parse(action.payload);

        return {
          ...state,
          disabled: permissions.disabled,
          error: permissions.error,
          isValid: permissions.isValid,
          isFetching: permissions.isFetching,
          permissions: permissions.permissions,
        };
      }

    default:
      {
        return state;
      }
  }
}
