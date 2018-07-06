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
        const { data } = response;

        return {
          users: data.users,
          count: data.count,
          totalCount: data.total_count,
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
    username, email, password, firstName, lastName,
  }) {
    return axios.post('/api/users', {
      user: {
        username,
        email,
        password,
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

  deleteUser(username) {
    return axios.delete(`/api/users/${username}`, {
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

  enableUser(username) {
    return axios.post(`/api/users/${username}`, {
      user: {
        active: true,
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
    username, email, firstName, lastName, password, roles,
  }) {
    const user = {
      username,
      email,
      firstName,
      lastName,
      roles,
    };

    if (password) { user.password = password; }

    return axios.post(`/api/users/${originalUsername}`, {
      user,
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
