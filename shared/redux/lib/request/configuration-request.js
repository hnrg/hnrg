import axios from 'axios';
import _ from 'lodash';

export default class ConfigurationRequest {
  init(token = null) {
    this._sessionToken = _.isNull(token)
      ? null
      : token;

    return this;
  }

  getConfiguration() {
    return axios.get('/api/configurations/current')
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response.data;
        }
        throw (response.data.error);
      })
      .catch((error) => {
        throw error;
      });
  }
}

// The singleton variable
export const configurationRequest = new ConfigurationRequest();
