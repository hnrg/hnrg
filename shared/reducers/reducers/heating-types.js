
import {
  GET_HEATING_TYPES_REQUEST,
  GET_HEATING_TYPES_SUCCESS,
  GET_HEATING_TYPES_FAILURE,

  LOGOUT_SUCCESS,

  SET_STATE,
} from 'reducers/constants';

/**
 * ## Initial State
 *
 */
import InitialState from 'reducers/states/heating-types-state';

/**
 * ## heatingTypesReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function heatingTypesReducer(state = InitialState, action) {
  let nextPermissionState = null;

  switch (action.type) {
    /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */
    case GET_HEATING_TYPES_REQUEST: {
      return { ...state, isFetching: true, error: null };
    }

    /**
     * ### Request ends successfully
     *
     * the fetching is done, set the UI fields and the originalPermissions
     *
     * Validate the data to make sure it's all good and someone didn't
     * mung it up through some other mechanism
     */
    case GET_HEATING_TYPES_SUCCESS: {
      return {
        ...state,
        heatingTypes: action.payload,
        isFetching: false,
        error: null,
      };
    }

    /**
     * User logged out, so reset form fields and original heatingType.
     *
     */
    case LOGOUT_SUCCESS: {
      return nextPermissionState = {
        ...state,
        heatingTypes: [],
        error: null,
      };
    }

    /**
     * ### Request fails
     * we're done fetching and the error needs to be displayed to the user
     */
    case GET_HEATING_TYPES_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    }


    case SET_STATE: {
      const { heatingTypes } = JSON.parse(action.payload);

      return {
        ...state,
        error: heatingTypes.error,
        isValid: heatingTypes.isValid,
        isFetching: heatingTypes.isFetching,
        heatingTypes: heatingTypes.heatingTypes,
      };
    }

    default: {
      return state;
    }
  }
}
