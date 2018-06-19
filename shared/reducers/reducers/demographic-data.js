import fieldValidation from 'reducers/lib/field-validation/demographic-data';
import formValidation from 'reducers/lib/form-validation/demographic-data';

import {
  GET_SINGLE_DEMOGRAPHIC_DATA_REQUEST,
  GET_SINGLE_DEMOGRAPHIC_DATA_SUCCESS,
  GET_SINGLE_DEMOGRAPHIC_DATA_FAILURE,

  GET_DEMOGRAPHIC_DATA_REQUEST,
  GET_DEMOGRAPHIC_DATA_SUCCESS,
  GET_DEMOGRAPHIC_DATA_FAILURE,

  DEMOGRAPHIC_DATA_ADD_REQUEST,
  DEMOGRAPHIC_DATA_ADD_SUCCESS,
  DEMOGRAPHIC_DATA_ADD_FAILURE,

  DEMOGRAPHIC_DATA_UPDATE_REQUEST,
  DEMOGRAPHIC_DATA_UPDATE_SUCCESS,
  DEMOGRAPHIC_DATA_UPDATE_FAILURE,

  ON_DEMOGRAPHIC_DATA_FORM_FIELD_CHANGE,

  LOGOUT_SUCCESS,

  SET_STATE,
} from 'reducers/constants';

/**
 * ## Initial State
 *
 */
import InitialState from 'reducers/states/demographic-data-state';

/**
 * ## demographicDataReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function demographicDataReducer(state = InitialState, action) {
  let nextDemographicDataState = null;

  switch (action.type) {
    /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */
    case GET_SINGLE_DEMOGRAPHIC_DATA_REQUEST:
    case GET_DEMOGRAPHIC_DATA_REQUEST:
    case DEMOGRAPHIC_DATA_ADD_REQUEST:
    case DEMOGRAPHIC_DATA_UPDATE_REQUEST:
    {
      return { ...state, isFetching: true, error: null };
    }

    /**
     * ### Request ends successfully
     *
     * the fetching is done, set the UI fields and the originalRol
     *
     * Validate the data to make sure it's all good and someone didn't
     * mung it up through some other mechanism
     */
    case GET_DEMOGRAPHIC_DATA_SUCCESS: {
      return {
        ...state,
        totalCount: action.payload.totalCount,
        count: action.payload.count,
        demographicData: action.payload.demographicData,
        isFetching: false,
        error: null,
      };
    }

    case DEMOGRAPHIC_DATA_ADD_SUCCESS:
    case DEMOGRAPHIC_DATA_UPDATE_SUCCESS:
    {
      return {
        ...state,
        isFetching: false,
        totalCount: 0,
        count: 0,
        demographicData: null,
        success: null,
      };
    }

    /**
     * user logged out, so reset form fields and original rol.
     *
     */
    case LOGOUT_SUCCESS: {
      return nextRolState = {
        ...state,
        demographicData: [],
        error: null,
        success: null,
      };
    }

    /**
     * ### Request fails
     * we're done fetching and the error needs to be displayed to the user
     */
    case GET_SINGLE_DEMOGRAPHIC_DATA_FAILURE:
    case GET_DEMOGRAPHIC_DATA_FAILURE:
    case DEMOGRAPHIC_DATA_ADD_FAILURE:
    case DEMOGRAPHIC_DATA_UPDATE_FAILURE:
    {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        success: null,
      };
    }

    case GET_SINGLE_DEMOGRAPHIC_DATA_SUCCESS: {
      nextRolState = {
        ...state,
        fields: {
          ...state.fields,
          refrigerator,
          electricity,
          pet,
          apartmentType,
          heatingType,
          waterType,
        },
        originalDemographicData: {
          ...state.originalDemographicData,
          refrigerator: action.payload.refrigerator,
          electricity: action.payload.electricity,
          pet: action.payload.pet,
          apartmentType: action.payload.apartmentType,
          heatingType: action.payload.heatingType,
          waterType: action.payload.waterType,
        },
        isFetching: false,
        error: null,
      };

      return fieldValidation(nextDemographicDataState, action);
    }

    case ON_DEMOGRAPHIC_DATA_FORM_FIELD_CHANGE: {
      const { field, value } = action.payload;

      nextRolState = {
        ...state,
        success: null,
        fields: {
          ...state.fields,
          [field]: value,
        },
      };

      return formValidation(fieldValidation(nextDemographicDataState, action), action);
    }

    /**
     * ### set the state
     *
     * This is in support of Hot Loading - take the payload
     * and set the values into the state
     *
     */
    case SET_STATE: {
      const { demographicData } = JSON.parse(action.payload);

      return {
        ...state,
        disabled: demographicData.disabled,
        error: demographicData.error,
        success: demographicData.success,
        isValid: demographicData.isValid,
        isFetching: demographicData.isFetching,
        originalDemographicData: demographicData.originalRol,
        fields: demographicData.fields,
        totalCount: demographicData.totalCount,
        count: demographicData.count,
        demographicData: demographicData.demographicData,
      };
    }

    default: {
      return state;
    }
  }
}
