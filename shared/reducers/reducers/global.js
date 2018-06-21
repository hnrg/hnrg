import {
  SET_SESSION_TOKEN,

  GET_PROFILE_SUCCESS,
  LOGIN_SUCCESS,
  SESSION_TOKEN_SUCCESS,

  LOGOUT_SUCCESS,

  GET_STATE,
  SET_STATE,
  SET_STORE,
} from 'reducers/constants';

import InitialState from 'reducers/states/global-state';

/**
 * ## globalReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function globalReducer(state = InitialState, action) {
  switch (action.type) {
    /**
     * ### Save the sessionToken
     */
    case SET_SESSION_TOKEN:
      return {
        ...state,
        currentUser: action.payload,
      };

      /**
       * ### Save the payload in the store
       *
       * This payload is the ```currentUser``` object returned by
       * the server.  It contains the ```sessionToken```
       * which will be needed for some calls to the server
       */
    case LOGIN_SUCCESS:
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };

    case SESSION_TOKEN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };

      /**
       * ### Clear currentUser
       *
       */
    case LOGOUT_SUCCESS:
    {
      return InitialState;
    }

    /**
       * ### sets the payload into the store
       *
       * *Note* this is for support of Hot Loading - the payload is the
       * ```store``` itself.
       *
       */
    case SET_STORE:
      return {
        ...state,
        store: action.payload,
      };

      /**
       * ### Get the current state from the store
       *
       * The Redux ```store``` provides the state object.
       * We convert each key to JSON and set it in the state
       *
       * *Note*: the global state removes the ```store```, otherwise,
       * when trying to convert to JSON, it will be recursive and fail
       */
    case GET_STATE:
    {
      const _state = state.store.getState();

      if (action.payload) {
        const newState = {};
        newState.profile = _state.profile;

        // Make sure global doesn't have the previous currentState
        // let _noCurrentState =  _state.global.set('currentState',null);
        // let _noStore = _noCurrentState.set('store',null);
        const _global = _state.global;
        newState.global = {
          ..._global,
          currentState: null,
          store: null,
        };

        return {
          ...state,
          showState: action.payload,
          currentUser: newState,
        };
      }
      return {
        ...state,
        showState: action.payload,
      };
    }

    /**
       * ### Set the state
       *
       * This is in support of Hot Loading
       *
       */
    case SET_STATE:
    {
      const {
        global,
      } = JSON.parse(action.payload);

      return {
        ...state,
        currentUser: global.currentUser,
        showState: false,
      };
    }

    default:
      return state;
  }
}
