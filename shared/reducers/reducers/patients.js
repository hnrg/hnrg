import fieldValidation from 'reducers/lib/field-validation';
import {
  GET_PATIENTS_REQUEST,
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAILURE,

  GET_PATIENT_REQUEST,
  GET_PATIENT_SUCCESS,
  GET_PATIENT_FAILURE,

  LOGOUT_SUCCESS,

  SET_STATE,
} from 'reducers/constants';

/**
 * ## Initial State
 *
 */
import InitialState from 'reducers/states/patients-state';

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
     * the fetching is done, set the UI fields and the originalPatient
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
     * User logged out, so reset form fields and original patient.
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
     * ### Request starts
     */
    case GET_PATIENT_REQUEST: {
      return { ...state, isFetching: true, error: null };
    }

    case GET_PATIENT_SUCCESS: {
      nextPatientState = {
        ...state,
        fields: {
          ...state.fields,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          address: action.payload.address,
          phone: action.payload.phone,
          birthday: action.payload.birthday,
          sex: action.payload.sex,
          documentType: action.payload.documentType.name,
          documentNumber: action.payload.documentNumber,
        },
        originalPatient: {
          ...state.originalPatient,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          address: action.payload.address,
          phone: action.payload.phone,
          birthday: action.payload.birthday,
          sex: action.payload.sex,
          state: action.payload.state,
          demographicData: action.payload.demographicData,
          medicalInsurance: action.payload.medicalInsurance,
          documentType: action.payload.documentType,
          documentNumber: action.payload.documentNumber,
          deleted: action.payload.deleted,
        },
        isFetching: false,
        error: null,
      };

      return fieldValidation(nextPatientState, action);
    }

    case GET_PATIENT_FAILURE: {
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

