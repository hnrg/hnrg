import {LOGIN} from '../constants';

export default {
  state: LOGIN,
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  email: '',
  emailHasError: false,
  emailErrorMsg: '',
  password: '',
  passwordHasError: false,
  passwordErrorMsg: '',
  showPassword: false
};
