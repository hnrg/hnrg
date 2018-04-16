import axios from 'axios';
import { reset } from 'redux-form';
import { getCookie, setCookie, expireCookie } from 'redux-cookie';
import Cookies from 'js-cookie';
import {
  FETCH_USER,
} from '../constants';

import * as actions from './app-actions.js';

export function fetchUser() {
  return function(dispatch) {
    const token = Cookies.get('token', {path:'/'});
    const user = Cookies.get('user', {path:'/'});
    axios.get(`/api/users/${user}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(response => {
        Cookies.set('connectedUser', response.data.user, {path:'/'});
        dispatch({type: FETCH_USER});
      })
      .catch(response => dispatch(actions.errorHandler(response)));
  };
}
