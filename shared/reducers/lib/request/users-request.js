import axios from 'axios';
import _ from 'lodash';

export default class UsersRequest {
  init(token = null) {
    this._sessionToken = _.isNull(token)
      ? null
      : token;

    return this;
  }

  getUsers(pageNumber = 1) {
    return axios.get('/api/users', {
      params: {
        pageNumber,
      },
      headers: {
        Authorization: this._sessionToken,
      },
    }).then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      throw (response.data.error);
    }).catch((error) => {
      throw error;
    });
  }

  getUser(username) {
    return axios.get(`/api/users/${username}`, {
      headers: {
        Authorization: this._sessionToken,
      },
    }).then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      throw (response.data.error);
    }).catch((error) => {
      throw error;
    });
  }

  addUser({
    username, email, firstName, lastName,
  }) {
    return axios.post('/api/users', {
      user: {
        username,
        email,
        firstName,
        lastName,
      },
    }, {
      headers: {
        Authorization: this._sessionToken,
      },
    }).then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      throw (response.data.error);
    }).catch((error) => {
      throw error;
    });
  }

  updateUser(originalUsername, {
    username, email, firstName, lastName,
  }) {
    return axios.post(`/api/users/${originalUsername}`, {
      user: {
        username,
        email,
        firstName,
        lastName,
      },
    }, {
      headers: {
        Authorization: this._sessionToken,
      },
    }).then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      throw (response.data.error);
    }).catch((error) => {
      throw error;
    });
  }
}

// The singleton variable
export const usersRequest = new UsersRequest();
