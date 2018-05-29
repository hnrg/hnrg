import axios from 'axios';
import _ from 'lodash';

export default class UsersRequest {
  init(token = null) {
    this._sessionToken = _.isNull(token)
      ? null
      : token;

    return this;
  }

  getUsers(pageNumber = 0, username = '', active = true) {
    return axios.get('/api/users', {
      params: {
        pageNumber,
        username: username.trim(),
        active,
      },
      headers: {
        Authorization: this._sessionToken,
      },
    }).then((response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        
        return {
          users: data.users,
          count: data.count,
          totalCount: data['total_count'],
        };
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
