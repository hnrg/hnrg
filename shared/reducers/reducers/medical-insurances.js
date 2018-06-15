import {
  GET_MEDICAL_INSURANCES_REQUEST,
  GET_MEDICAL_INSURANCES_SUCCESS,
  GET_MEDICAL_INSURANCES_FAILURE,

  LOGOUT_SUCCESS,

  SET_STATE,
} from 'reducers/constants';

/**
 * ## Initial State
 *
 */
import InitialState from 'reducers/states/medical-insurances-state';

/**
 * ## medicalInsurancesReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function medicalInsurancesReducer(state = InitialState, action) {
  let nextMedicalInsuranceState = null;

  switch (action.type) {
    /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */
    case GET_MEDICAL_INSURANCES_REQUEST: {
      return { ...state, isFetching: true, error: null };
    }

    /**
     * ### Request ends successfully
     *
     * the fetching is done, set the UI fields and the originalMedicalInsurances
     *
     * Validate the data to make sure it's all good and someone didn't
     * mung it up through some other mechanism
     */
    case GET_MEDICAL_INSURANCES_SUCCESS: {
      return {
        ...state,
        medicalInsurances: action.payload,
        isFetching: false,
        error: null,
      };
    }

    /**
     * User logged out, so reset form fields and original medicalInsurance.
     *
     */
    case LOGOUT_SUCCESS: {
      return nextMedicalInsuranceState = {
        ...state,
        medicalInsurances: [],
        error: null,
      };
    }

    /**
     * ### Request fails
     * we're done fetching and the error needs to be displayed to the user
     */
    case GET_MEDICAL_INSURANCES_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    }


    case SET_STATE: {
      const { medicalInsurances } = JSON.parse(action.payload);

      return {
        ...state,
        disabled: medicalInsurances.disabled,
        error: medicalInsurances.error,
        isValid: medicalInsurances.isValid,
        isFetching: medicalInsurances.isFetching,
        medicalInsurances: medicalInsurances.medicalInsurances,
      };
    }

    default: {
      return state;
    }
  }
}
