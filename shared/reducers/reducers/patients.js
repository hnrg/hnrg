import fieldValidation from 'reducers/lib/field-validation/patients';
import formValidation from 'reducers/lib/form-validation/patients';

import {
  GET_PATIENTS_REQUEST,
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAILURE,

  GET_PATIENT_REQUEST,
  GET_PATIENT_SUCCESS,
  GET_PATIENT_FAILURE,

  PATIENT_ADD_REQUEST,
  PATIENT_ADD_SUCCESS,
  PATIENT_ADD_FAILURE,

  PATIENT_UPDATE_REQUEST,
  PATIENT_UPDATE_SUCCESS,
  PATIENT_UPDATE_FAILURE,

  PATIENT_DELETE_REQUEST,
  PATIENT_DELETE_SUCCESS,
  PATIENT_DELETE_FAILURE,

  ON_PATIENT_FORM_CLEAR,
  ON_PATIENT_FORM_FIELD_CHANGE,

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
    case GET_PATIENTS_REQUEST:
    case GET_PATIENT_REQUEST:
    case PATIENT_ADD_REQUEST:
    case PATIENT_UPDATE_REQUEST:
    case PATIENT_DELETE_REQUEST:
    {
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
        totalCount: action.payload.totalCount,
        count: action.payload.count,
        patients: action.payload.patients,
        isFetching: false,
        error: null,
      };
    }

    case PATIENT_ADD_SUCCESS:
    case PATIENT_UPDATE_SUCCESS:
    case PATIENT_DELETE_SUCCESS:
    {
      return {
        ...state,
        isFetching: false,
        totalCount: 0,
        count: 0,
        patients: null,
      };
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
          medicalInsurance: action.payload.medicalInsurance,
          documentType: action.payload.documentType,
          documentNumber: action.payload.documentNumber,
        },
        originalPatient: {
          ...state.originalPatient,
          id: action.payload._id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          fullName: action.payload.firstName + ' ' + action.payload.lastName,
          address: action.payload.address,
          phone: action.payload.phone,
          birthday: action.payload.birthday,
          sex: action.payload.sex,
          demographicData: action.payload.demographicData,
          medicalInsurance: action.payload.medicalInsurance,
          documentType: action.payload.documentType,
          documentNumber: action.payload.documentNumber,
          deleted: action.payload.deleted,
        },
        isFetching: false,
        error: null,
      };

      if (action.payload.demographicData !== null) {
        nextPatientState = {
          ...nextPatientState,
          fields: {
            ...nextPatientState.fields,
            refrigerator: action.payload.demographicData.refrigerator,
            electricity: action.payload.demographicData.electricity,
            pet: action.payload.demographicData.pet,
            apartmentType: action.payload.demographicData.apartmentType,
            heatingType: action.payload.demographicData.heatingType,
            waterType: action.payload.demographicData.waterType,
          },
        };
      }

      return fieldValidation(nextPatientState, action);
    }

    case ON_PATIENT_FORM_CLEAR: {
      return {
        ...state,
        fields: {
          firstName: '',
          firstNameHasError: false,
          firstNameErrorMsg: '',
          lastName: '',
          lastNameHasError: false,
          lastNameErrorMsg: '',
          address: '',
          addressHasError: false,
          addressErrorMsg: '',
          phone: '',
          phoneNHasError: false,
          phoneErrorMsg: '',
          birthday: '',
          birthdayHasError: false,
          birthdayErrorMsg: '',
          sex: '',
          sexHasError: false,
          sexErrorMsg: '',
          demographicData: null,
          demographicDataHasError: false,
          demographicDataErrorMsg: '',
          medicalInsurance: null,
          medicalInsuranceHasError: false,
          medicalInsuranceErrorMsg: '',
          documentType: null,
          documentTypeHasError: false,
          documentTypeErrorMsg: '',
          documentNumber: 0,
          documentNumberHasError: false,
          documentNumberErrorMsg: '',
          refrigerator: null,
          refrigeratorHasError: false,
          refrigeratorErrorMsg: '',
          electricity: null,
          electricityHasError: false,
          electricityErrorMsg: '',
          pet: null,
          petHasError: false,
          petErrorMsg: '',
          apartmentType: null,
          apartmentTypeHasError: false,
          apartmentTypeErrorMsg: '',
          heatingType: null,
          heatingTypeHasError: false,
          heatingTypeErrorMsg: '',
          waterType: null,
          waterTypeHasError: false,
          waterTypeErrorMsg: '',
          deleted: null,
          deletedHasError: false,
          deletedErrorMsg: '',
        },
      };
    }

    case ON_PATIENT_FORM_FIELD_CHANGE: {
      const { field, value } = action.payload;

      nextPatientState = {
        ...state,
        fields: {
          ...state.fields,
          [field]: value,
        },
      };

      return formValidation(fieldValidation(nextPatientState, action), action);
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
    case GET_PATIENTS_FAILURE:
    case GET_PATIENT_FAILURE:
    case PATIENT_ADD_FAILURE:
    case PATIENT_UPDATE_FAILURE:
    case PATIENT_DELETE_FAILURE:
    {
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
        disabled: patients.disabled,
        error: patients.error,
        isValid: patients.isValid,
        isFetching: patients.isFetching,
        patients: patients.patients,
        totalCount: patients.totalCount,
        count: patients.count,
        originalPatient: patients.originalPatient,
        fields: patients.fields,
      };
    }

    default: {
      return state;
    }
  }
}
