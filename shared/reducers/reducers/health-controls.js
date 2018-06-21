import {
  GET_HEALTH_CONTROLS_REQUEST,
  GET_HEALTH_CONTROLS_SUCCESS,
  GET_HEALTH_CONTROLS_FAILURE,

  GET_HEALTH_CONTROL_REQUEST,
  GET_HEALTH_CONTROL_SUCCESS,
  GET_HEALTH_CONTROL_FAILURE,

  HEALTH_CONTROL_ADD_REQUEST,
  HEALTH_CONTROL_ADD_SUCCESS,
  HEALTH_CONTROL_ADD_FAILURE,

  HEALTH_CONTROL_DELETE_REQUEST,
  HEALTH_CONTROL_DELETE_SUCCESS,
  HEALTH_CONTROL_DELETE_FAILURE,

  HEALTH_CONTROL_ENABLE_REQUEST,
  HEALTH_CONTROL_ENABLE_SUCCESS,
  HEALTH_CONTROL_ENABLE_FAILURE,

  HEALTH_CONTROL_PERMISSION_DELETE_REQUEST,
  HEALTH_CONTROL_PERMISSION_DELETE_SUCCESS,
  HEALTH_CONTROL_PERMISSION_DELETE_FAILURE,

  HEALTH_CONTROL_UPDATE_REQUEST,
  HEALTH_CONTROL_UPDATE_SUCCESS,
  HEALTH_CONTROL_UPDATE_FAILURE,

  ON_HEALTH_CONTROL_FORM_CLEAR,
  ON_HEALTH_CONTROL_FORM_FIELD_CHANGE,

  LOGOUT_SUCCESS,

  SET_STATE,
} from 'reducers/constants';

/**
 * ## Initial State
 *
 */
import InitialState from 'reducers/states/health-controls-state';

/**
 * ## healthControlReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function healthControlsReducer(state = InitialState, action) {
  let nextHealthControlState = null;

  switch (action.type) {
    /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */
    case GET_HEALTH_CONTROLS_REQUEST:
    case GET_HEALTH_CONTROL_REQUEST:
    case HEALTH_CONTROL_ADD_REQUEST:
    case HEALTH_CONTROL_DELETE_REQUEST:
    case HEALTH_CONTROL_ENABLE_REQUEST:
    case HEALTH_CONTROL_UPDATE_REQUEST:
      {
        return { ...state,
          isFetching: true,
          error: null
        };
      }

      /**
       * ### Request ends successfully
       *
       * the fetching is done, set the UI fields and the originalPatient
       *
       * Validate the data to make sure it's all good and someone didn't
       * mung it up through some other mechanism
       */
    case GET_HEALTH_CONTROLS_SUCCESS:
      {
        return {
          ...state,
          totalCount: action.payload.totalCount,
          count: action.payload.count,
          healthControls: action.payload.healthControls,
          isFetching: false,
          error: null,
        };
      }

    case HEALTH_CONTROL_ADD_SUCCESS:
    case HEALTH_CONTROL_DELETE_SUCCESS:
    case HEALTH_CONTROL_ENABLE_SUCCESS:
    case HEALTH_CONTROL_PERMISSION_DELETE_SUCCESS:
    case HEALTH_CONTROL_UPDATE_SUCCESS:
      {
        return {
          ...state,
          isFetching: false,
          totalCount: 0,
          count: 0,
          healthControls: null,
          success: true,
        };
      }

      /**
       * User logged out, so reset form fields and original healthControl.
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
    case GET_HEALTH_CONTROLS_FAILURE:
    case GET_HEALTH_CONTROL_FAILURE:
    case HEALTH_CONTROL_ADD_FAILURE:
    case HEALTH_CONTROL_DELETE_FAILURE:
    case HEALTH_CONTROL_ENABLE_FAILURE:
    case HEALTH_CONTROL_PERMISSION_DELETE_FAILURE:
    case HEALTH_CONTROL_UPDATE_FAILURE:
      {
        return {
          ...state,
          isFetching: false,
          error: action.payload,
          success: null,
        };
      }

    case GET_HEALTH_CONTROL_SUCCESS:
      {
        nextHealthControlState = {
          ...state,
          fields: {
            ...state.fields,
            date: action.payload.date,
            weight: action.payload.weight,
            pc: action.payload.pc,
            ppc: action.payload.ppc,
            height: action.payload.height,
            completeVaccines: action.payload.completeVaccines,
            vaccinesObservations: action.payload.vaccinesObservations,
            maturationObservations: action.payload.maturationObservations,
            commonPhysicalExamination: action.payload.commonPhysicalExamination,
            physicalExaminationObservations: action.payload.physicalExaminationObservations,
            feeding: action.payload.feeding,
            generalObservations: action.payload.generalObservations,
          },
          originalHealthControl: {
            ...state.originalHealthControl,
            date: action.payload.date,
            weight: action.payload.weight,
            pc: action.payload.pc,
            ppc: action.payload.ppc,
            height: action.payload.height,
            completeVaccines: action.payload.completeVaccines,
            vaccinesObservations: action.payload.vaccinesObservations,
            maturationObservations: action.payload.maturationObservations,
            commonPhysicalExamination: action.payload.commonPhysicalExamination,
            physicalExaminationObservations: action.payload.physicalExaminationObservations,
            feeding: action.payload.feeding,
            generalObservations: action.payload.generalObservations,
            patient: action.payload.patient,
            user: action.payload.user,
            active: action.payload.active,
          },
          isFetching: false,
          error: null,
        };

        return fieldValidation(nextHealthControlState, action);
      }

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
          healthControls
        } = JSON.parse(action.payload);

        return {
          ...state,
          disabled: healthControls.disabled,
          error: healthControls.error,
          success: healthControls.success,
          isValid: healthControls.isValid,
          isFetching: healthControls.isFetching,
          healthControls: healthControls.healthControls,
          totalCount: healthControls.totalCount,
          count: healthControls.count,
          originalHealthControl: healthControls.originalHealthControl,
          fields: healthControls.fields,
        };
      }

    default:
      {
        return state;
      }
  }
}
