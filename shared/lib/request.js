import axios from 'axios';
import FakeBackend from './fake-backend';

export default class Request extends FakeBackend {
  initialize(token) {
    this._sessionToken = _.isNull(token)
      ? null
      : token;
  }

  login({email, password}) {
    return axios.post('/api/auth/login', {email, password}).then(response => {
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw(response.data.error);
      }
    }).catch(error => {
      throw error;
    });
  }

  getProfile() {
    return axios.get('/api/auth/me', {
      headers: {
        Authorization: this._sessionToken
      }
    }).then(response => {
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw(response.data.error);
      }
    }).catch(error => {
      throw error;
    });
  }
}

// The singleton variable
export let request = new Request();
