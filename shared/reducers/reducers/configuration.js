import {
  GET_CONFIGURATION_REQUEST,
  GET_CONFIGURATION_SUCCESS,
  GET_CONFIGURATION_FAILURE,

  LOGOUT_SUCCESS,

  SET_STATE,
} from 'reducers/constants';

/**
 * ## Initial State
 *
 */
import InitialState from 'reducers/states/configuration-state';

/**
 * ## configurationReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function configurationReducer(state = InitialState, action) {
  switch (action.type) {
    /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */
    case GET_CONFIGURATION_REQUEST:
      return { ...state, isFetching: true, error: null };

    /**
     * ### Request ends successfully
     *
     * the fetching is done
     *
     * Validate the data to make sure it's all good and someone didn't
     * mung it up through some other mechanism
     */
    case GET_CONFIGURATION_SUCCESS:
      return {
        ...state,
        current: {
          ...state.current,
          webpage: {
            name: action.payload.webpage.name,
            amountPerPage: action.payload.webpage.amountPerPage,
            email: action.payload.webpage.email,
            description: action.payload.webpage.description,
          },
          maintenance: action.payload.maintenance,
        },
        isFetching: false,
        error: null,
      };

    /**
     * User logged out, so reset form fields and original configuration.
     *
     */
    case LOGOUT_SUCCESS:
      return {
        ...state,
        email: '',
        error: null,
      };

    /**
     * ### Request fails
     * we're done fetching and the error needs to be displayed to the user
     */
    case GET_CONFIGURATION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    /**
     * ### set the state
     *
     * This is in support of Hot Loading - take the payload
     * and set the values into the state
     *
     */
    case SET_STATE: {
      const { configuration } = JSON.parse(action.payload);
      const { current } = state;

      return {
        ...state,
        disabled: configuration.disabled,
        error: configuration.error,
        isValid: configuration.isValid,
        isFetching: configuration.isFetching,
        configurations: configuration.configurations,
        current: {
          ...current,
          webpage: {
            name: configuration.current.webpage.name,
            amountPerPage: configuration.current.webpage.amountPerPage,
            email: configuration.current.webpage.email,
            description: configuration.current.webpage.description,
          },
          appointments: {
            from: configuration.current.appointments.from,
            delta: configuration.current.appointments.delta,
            ammount: configuration.current.appointments.ammount,
          },
          maintenance: configuration.current.maintenance,
        },
      };
    }

    default:
      return state;
  }
}
