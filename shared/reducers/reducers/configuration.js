import fieldValidation from 'reducers/lib/field-validation/configuration';
import formValidation from 'reducers/lib/form-validation/configuration';

import {
  GET_CONFIGURATION_REQUEST,
  GET_CONFIGURATION_SUCCESS,
  GET_CONFIGURATION_FAILURE,

  CONFIGURATION_ADD_REQUEST,
  CONFIGURATION_ADD_SUCCESS,
  CONFIGURATION_ADD_FAILURE,

  ON_CONFIGURATION_FORM_FIELD_CHANGE,

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
  let nextConfigurationState = null;

  switch (action.type) {
    /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */
    case CONFIGURATION_ADD_REQUEST:
    case GET_CONFIGURATION_REQUEST:
      return { ...state,
        isFetching: true,
        error: null
      };

    case CONFIGURATION_ADD_SUCCESS:
      {
        return { ...state,
          isFetching: false,
          success: true
        };
      }

      /**
       * ### Request ends successfully
       *
       * the fetching is done
       *
       * Validate the data to make sure it's all good and someone didn't
       * mung it up through some other mechanism
       */
    case GET_CONFIGURATION_SUCCESS:
      {
        nextConfigurationState = {
          ...state,
          current: {
            ...state.current,
            name: action.payload.webpage.name,
            amountPerPage: action.payload.webpage.amountPerPage,
            email: action.payload.webpage.email,
            description: action.payload.webpage.description,
            from: action.payload.appointments.from,
            delta: action.payload.appointments.delta,
            amount: action.payload.appointments.amount,
            maintenance: action.payload.maintenance,
            user: action.payload.user,
            createdAt: action.payload.createdAt,
            updatedAt: action.payload.updatedAt,
          },
          fields: {
            ...state.fields,
            name: action.payload.webpage.name,
            amountPerPage: action.payload.webpage.amountPerPage,
            email: action.payload.webpage.email,
            description: action.payload.webpage.description,
            from: action.payload.appointments.from,
            delta: action.payload.appointments.delta,
            amount: action.payload.appointments.amount,
            maintenance: action.payload.maintenance,
          },
          isFetching: false,
          error: null,
        };

        return formValidation(fieldValidation(nextConfigurationState, action), action);
      }

    case ON_CONFIGURATION_FORM_FIELD_CHANGE:
      {
        const {
          field,
          value
        } = action.payload;

        nextConfigurationState = {
          ...state,
          success: null,
          fields: {
            ...state.fields,
            [field]: value,
          },
        };

        return formValidation(fieldValidation(nextConfigurationState, action), action);
      }

      /**
       * User logged out, so reset form fields and original configuration.
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
    case CONFIGURATION_ADD_FAILURE:
    case GET_CONFIGURATION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        success: null,
      };

      /**
       * ### set the state
       *
       * This is in support of Hot Loading - take the payload
       * and set the values into the state
       *
       */
    case SET_STATE:
      {
        const {
          configuration
        } = JSON.parse(action.payload);
        const {
          current,
          fields
        } = state;

        return {
          ...state,
          disabled: configuration.disabled,
          error: configuration.error,
          success: configuration.success,
          isValid: configuration.isValid,
          isFetching: configuration.isFetching,
          configurations: configuration.configurations,
          current: {
            ...current,
            name: configuration.current.webpage.name,
            amountPerPage: configuration.current.webpage.amountPerPage,
            email: configuration.current.webpage.email,
            description: configuration.current.webpage.description,
            from: configuration.current.appointments.from,
            delta: configuration.current.appointments.delta,
            amount: configuration.current.appointments.amount,
            maintenance: configuration.current.maintenance,
            user: configuration.current.user,
            createdAt: configuration.current.createdAt,
            updatedAt: configuration.current.updatedAt,
          },
          fields: {
            ...fields,
            name: configuration.fields.webpage.name,
            amountPerPage: configuration.fields.webpage.amountPerPage,
            email: configuration.fields.webpage.email,
            description: configuration.fields.webpage.description,
            from: configuration.fields.appointments.from,
            delta: configuration.fields.appointments.delta,
            amount: configuration.fields.appointments.amount,
            maintenance: configuration.fields.maintenance,
          },
        };
      }

    default:
      return state;
  }
}
