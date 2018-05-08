import {
  GET_PATIENTS_REQUEST,
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAILURE,

  LOGOUT_SUCCESS,

  SET_STATE,
} from '../constants';

/**
 * ## Initial State
 *
 */
import InitialState from '../states/patients-state';

/**
 * ## patientReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function patientsReducer(state = InitialState, action) {
  let nextPatientState = null;

  switch (action.type) {
    /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */
    case GET_PATIENTS_REQUEST: {
      return { ...state, isFetching: true, error: null };
    }

    /**
     * ### Request ends successfully
     *
     * the fetching is done, set the UI fields and the originalProfile
     *
     * Validate the data to make sure it's all good and someone didn't
     * mung it up through some other mechanism
     */
    case GET_PATIENTS_SUCCESS: {
      return {
        ...state,
        patients: action.payload,
        isFetching: false,
        error: null,
      };
    }

    /**
     * User logged out, so reset form fields and original profile.
     *
     */
    case LOGOUT_SUCCESS: {
      return nextPatientState = {
        ...state,
        patients: [],
        error: null,
      };
    }

    /**
     * ### Request fails
     * we're done fetching and the error needs to be displayed to the user
     */
    case GET_PATIENTS_FAILURE: {
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
      const { patients } = JSON.parse(action.payload);

      return {
        ...state,
        disabled: state.patients.disabled,
        error: state.patients.error,
        isValid: state.patients.isValid,
        isFetching: state.patients.isFetching,
        patients: state.patients.patients,
      };
    }

    default: {
      return state;
    }
  }
}
