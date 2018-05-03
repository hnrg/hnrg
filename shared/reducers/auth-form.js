import InitialState from '../states/auth-state';
import {
  LOGOUT,
  LOGIN,
  FORGOT_PASSWORD,
} from '../constants';

export default function (state = InitialState) {
  switch (state.state) {
    case LOGOUT:
      return { ...state, isValid: true };
    case LOGIN:
      if (state.fields.email !== '' &&
          state.fields.password !== '' &&
          !state.fields.emailHasError &&
          !state.fields.passwordHasError) {
        return { ...state, isValid: true };
      }
      return { ...state, isValid: false };

    case FORGOT_PASSWORD:
      if (state.fields.email !== '' &&
        !state.fields.emailHasError) {
        return { ...state, isValid: true };
      }
      return { ...state, isValid: false };
  }

  return state;
}
