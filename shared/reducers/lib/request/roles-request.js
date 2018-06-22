import axios from 'axios';
import _ from 'lodash';

export default class RolesRequest {
  init(token = null) {
    this._sessionToken = _.isNull(token)
      ? null
      : token;

    return this;
  }

  getAllRoles() {
    return axios.get('/api/roles/all', {
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

  getRoles(pageNumber = 0, name = '', deleted = false) {
    return axios.get('/api/roles', {
      params: {
        pageNumber,
        name: name.trim(),
        deleted,
      },
      headers: {
        Authorization: this._sessionToken,
      },
    }).then((response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;

        return {
          roles: data.roles,
          count: data.count,
          totalCount: data.total_count,
        };
      }
      throw (response.data.error);
    }).catch((error) => {
      throw error;
    });
  }

  getRol(rolname) {
    return axios.get(`/api/roles/${rolname}`, {
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

  addRol({
    name,
    permissions,
  }) {
    return axios.post('/api/roles', {
      rol: {
        name,
        permissions,
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

  deleteRol(rolname) {
    return axios.delete(`/api/roles/${rolname}`, {
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

  deleteRolPermission(rolname, permission) {
    return axios.delete(`/api/roles/${rolname}/${permission}`, {
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

  enableRol(rolname) {
    return axios.post(`/api/roles/${rolname}`, {
      rol: {
        deleted: false,
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

  updateRol(originalRolname, {
    name,
    permissions,
  }) {
    return axios.post(`/api/roles/${originalRolname}`, {
      rol: {
        name,
        permissions,
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
export const rolesRequest = new RolesRequest();
