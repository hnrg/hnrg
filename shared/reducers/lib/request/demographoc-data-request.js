import axios from 'axios';
import _ from 'lodash';

export default class DemographicDataRequest {
  init(token = null) {
    this._sessionToken = _.isNull(token)
      ? null
      : token;

    return this;
  }

  getDemographicData(pageNumber = 0) {
    return axios.get('/api/demographic-data', {
      params: {
        pageNumber,
      },
      headers: {
        Authorization: this._sessionToken,
      },
    }).then((response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;

        return {
          demographicData: data.demographicData,
          count: data.count,
          totalCount: data.total_count,
        };
      }
      throw (response.data.error);
    }).catch((error) => {
      throw error;
    });
  }

  getSingleDemogrphicData(demographicDataId) {
    return axios.get(`/api/demographic-data/${demographicDataId}`, {
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

  updateDemographicData(demographicDataId, {
    refrigerator,
    electricity,
    pet,
    apartmentType,
    heatingType,
    waterType,
  }) {
    return axios.post(`/api/demographic-data/${demographicDataId}`, {
      demographicData: {
        refrigerator,
        electricity,
        pet,
        apartmentType,
        heatingType,
        waterType,
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
export const demographicDataRequest = new DemographicDataRequest();
