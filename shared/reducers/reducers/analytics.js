import {
  GET_DEMOGRAPHIC_DATA_ANALYTICS_REQUEST,
  GET_DEMOGRAPHIC_DATA_ANALYTICS_SUCCESS,
  GET_DEMOGRAPHIC_DATA_ANALYTICS_FAILURE,

  GET_HEALTH_CONTROLS_ANALYTICS_REQUEST,
  GET_HEALTH_CONTROLS_ANALYTICS_SUCCESS,
  GET_HEALTH_CONTROLS_ANALYTICS_FAILURE,

  LOGOUT_SUCCESS,

  SET_STATE,
} from 'reducers/constants';

/**
 * ## Initial State
 *
 */
import InitialState from 'reducers/states/analytics-state';

/**
 * ## analyticsReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function analyticsReducer(state = InitialState, action) {
  const nextPermissionState = null;

  switch (action.type) {
    /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */
    case GET_HEALTH_CONTROLS_ANALYTICS_REQUEST:
    case GET_DEMOGRAPHIC_DATA_ANALYTICS_REQUEST:
    {
      return {
        ...state,
        isFetching: true,
        error: null,
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
    case GET_HEALTH_CONTROLS_ANALYTICS_SUCCESS:
    {
      return {
        ...state,
        healthControls: {
          name: action.payload.name,
          data: action.payload.data.map(d => [ d[0].$numberDecimal, d[1].$numberDecimal ]),
        },
        isFetching: false,
        error: null,
      };
    }

    case GET_DEMOGRAPHIC_DATA_ANALYTICS_SUCCESS:
    {
      return {
        ...state,
        demographicDataAnalytics: action.payload,
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
    case GET_HEALTH_CONTROLS_ANALYTICS_FAILURE:
    case GET_DEMOGRAPHIC_DATA_ANALYTICS_FAILURE:
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
        analytics,
      } = JSON.parse(action.payload);

      return {
        ...state,
        disabled: analytics.disabled,
        error: analytics.error,
        isValid: analytics.isValid,
        isFetching: analytics.isFetching,
        demographicDataAnalytics: analytics.demographicDataAnalytics,
        healthControls: analytics.healthControls,
      };
    }

    default:
    {
      return state;
    }
  }
}
