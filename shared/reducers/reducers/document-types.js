
import {
  GET_DOCUMENT_TYPES_REQUEST,
  GET_DOCUMENT_TYPES_SUCCESS,
  GET_DOCUMENT_TYPES_FAILURE,

  LOGOUT_SUCCESS,

  SET_STATE,
} from 'reducers/constants';

/**
 * ## Initial State
 *
 */
import InitialState from 'reducers/states/document-types-state';

/**
 * ## documentTypesReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function documentTypesReducer(state = InitialState, action) {
  let nextPermissionState = null;

  switch (action.type) {
    /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */
    case GET_DOCUMENT_TYPES_REQUEST: {
      return { ...state, isFetching: true, error: null };
    }

    /**
     * ### Request ends successfully
     *
     * the fetching is done, set the UI fields and the originalPermissions
     *
     * Validate the data to make sure it's all good and someone didn't
     * mung it up through some other mechanism
     */
    case GET_DOCUMENT_TYPES_SUCCESS: {
      return {
        ...state,
        documentTypes: action.payload,
        isFetching: false,
        error: null,
      };
    }

    /**
     * User logged out, so reset form fields and original documentType.
     *
     */
    case LOGOUT_SUCCESS: {
      return nextPermissionState = {
        ...state,
        documentTypes: [],
        error: null,
      };
    }

    /**
     * ### Request fails
     * we're done fetching and the error needs to be displayed to the user
     */
    case GET_DOCUMENT_TYPES_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    }


    case SET_STATE: {
      const { documentTypes } = JSON.parse(action.payload);

      return {
        ...state,
        error: documentTypes.error,
        isValid: documentTypes.isValid,
        isFetching: documentTypes.isFetching,
        documentTypes: documentTypes.documentTypes,
      };
    }

    default: {
      return state;
    }
  }
}
