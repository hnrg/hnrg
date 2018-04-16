import axios from 'axios';
import { reset } from 'redux-form';
import { getCookie, setCookie, expireCookie } from 'redux-cookie';
import {
  FETCH_USER,
} from '../constants';

import * from './app-actions.js';

export function fetchUser() {
  return function(dispatch) {
    const token = getCookie('token', {path: '/'});
    const user = getCookie('user', {path: '/'});

    axios.post(`/api/users/${user}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(response => {
        setCookie('connectedUser', response.data.user, {path: '/'});
        dispatch({type: FETCH_USER});
      })
      .catch(response => dispatch(errorHandler(response.data.error)));
  };
}
