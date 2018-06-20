import {
  GET_DOCUMENT_TYPES_REQUEST,
  GET_DOCUMENT_TYPES_SUCCESS,
  GET_DOCUMENT_TYPES_FAILURE,
} from 'reducers/constants';

import { errorHandler } from 'helpers/error-handler';
import { documentTypesRequest } from 'reducers/lib/request/document-types-request';
import { authToken } from 'reducers/lib/store/auth-token';

/**
 * ## retreiving profile actions
 */
export function getDocumentTypesRequest() {
  return {
    type: GET_DOCUMENT_TYPES_REQUEST,
  };
}

export function getDocumentTypesSuccess(documentTypes) {
  return {
    type: GET_DOCUMENT_TYPES_SUCCESS,
    payload: documentTypes,
  };
}

export function getDocumentTypesFailure(error) {
  return {
    type: GET_DOCUMENT_TYPES_FAILURE,
    payload: error,
  };
}


/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getDocumentTypes(pageNumber, sessionToken) {
  return (dispatch) => {
    dispatch(getDocumentTypesRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => documentTypesRequest.init(token).getDocumentTypes(pageNumber))
      .then((data) => {
        dispatch(getDocumentTypesSuccess(data.documentTypes));
      })
      .catch((error) => {
        dispatch(getDocumentTypesFailure(errorHandler(error)));
      });
  };
}
