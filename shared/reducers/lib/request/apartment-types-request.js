import axios from 'axios';
import _ from 'lodash';

export default class ApartmentTypesRequest {
  init(token = null) {
    this._sessionToken = _.isNull(token)
      ? null
      : token;

    return this;
  }

  getApartmentTypes() {
    return axios.get('/api/apartment-types', {
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
export const apartmentTypesRequest = new ApartmentTypesRequest();
