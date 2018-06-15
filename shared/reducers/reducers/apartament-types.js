
import {
  GET_APARTAMENT_TYPES_REQUEST,
  GET_APARTAMENT_TYPES_SUCCESS,
  GET_APARTAMENT_TYPES_FAILURE,

  LOGOUT_SUCCESS,

  SET_STATE,
} from 'reducers/constants';

/**
 * ## Initial State
 *
 */
import InitialState from 'reducers/states/apartament-types-state';

/**
 * ## apartamentTypesReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function apartamentTypesReducer(state = InitialState, action) {
  let nextPermissionState = null;

  switch (action.type) {
    /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */
    case GET_APARTAMENT_TYPES_REQUEST: {
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
    case GET_APARTAMENT_TYPES_SUCCESS: {
      return {
        ...state,
        apartamentTypes: action.payload,
        isFetching: false,
        error: null,
      };
    }

    /**
     * User logged out, so reset form fields and original apartamentType.
     *
     */
    case LOGOUT_SUCCESS: {
      return nextPermissionState = {
        ...state,
        apartamentTypes: [],
        error: null,
      };
    }

    /**
     * ### Request fails
     * we're done fetching and the error needs to be displayed to the user
     */
    case GET_APARTAMENT_TYPES_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    }


    case SET_STATE: {
      const { apartamentTypes } = JSON.parse(action.payload);

      return {
        ...state,
        error: apartamentTypes.error,
        isValid: apartamentTypes.isValid,
        isFetching: apartamentTypes.isFetching,
        apartamentTypes: apartamentTypes.apartamentTypes,
      };
    }

    default: {
      return state;
    }
  }
}
