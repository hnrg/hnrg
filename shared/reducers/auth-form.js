import InitialState from '../states/auth-state';
import {
  LOGOUT,
  LOGIN,
  FORGOT_PASSWORD,
} from '../constants';

export default function(state = InitialState) {

  switch(state.state) {
    case LOGOUT:
      return { ...state, isValid: true, };
    case LOGIN:
      if (state.email !== '' &&
          state.password !== '' &&
          !state.emailHasError &&
          !state.passwordHasError) {
        return { ...state, isValid: true, };
      } else {
        return { ...state, isValid: false, };
      }
    case FORGOT_PASSWORD:
      if (state.email !== '' &&
        !state.emailHasError) {
        return { ...state, isValid: true, };
      } else {
        return { ...state, isValid: false, };
      }
  }

  return state;
}
