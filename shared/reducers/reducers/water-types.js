import {
  GET_WATER_TYPES_REQUEST,
  GET_WATER_TYPES_SUCCESS,
  GET_WATER_TYPES_FAILURE,

  LOGOUT_SUCCESS,

  SET_STATE,
} from 'reducers/constants';

/**
 * ## Initial State
 *
 */
import InitialState from 'reducers/states/water-types-state';

/**
 * ## waterTypesReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function waterTypesReducer(state = InitialState, action) {
  let nextPermissionState = null;

  switch (action.type) {
    /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */
    case GET_WATER_TYPES_REQUEST:
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
    case GET_WATER_TYPES_SUCCESS:
      {
        return {
          ...state,
          waterTypes: action.payload,
          isFetching: false,
          error: null,
        };
      }

      /**
       * User logged out, so reset form fields and original waterType.
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
    case GET_WATER_TYPES_FAILURE:
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
          waterTypes
        } = JSON.parse(action.payload);

        return {
          ...state,
          error: waterTypes.error,
          isValid: waterTypes.isValid,
          isFetching: waterTypes.isFetching,
          waterTypes: waterTypes.waterTypes,
        };
      }

    default:
      {
        return state;
      }
  }
}
