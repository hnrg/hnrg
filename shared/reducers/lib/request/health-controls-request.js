import axios from 'axios';
import _ from 'lodash';

export default class HealthControlsRequest {
  init(token = null) {
    this._sessionToken = _.isNull(token)
      ? null
      : token;

    return this;
  }

  getHealthControls(pageNumber = 0) {
    return axios.get('/api/health-controls', {
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
          healthControls: data.healthControls,
          count: data.count,
          totalCount: data.total_count,
        };
      }
      throw (response.data.error);
    }).catch((error) => {
      throw error;
    });
  }

  getHealthControl(healthControl) {
    return axios.get(`/api/health-controls/${healthControl}`, {
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

  addHealthControl({
    date,
    weight,
    pc,
    ppc,
    height,
    completeVaccines,
    vaccinesObservations,
    maturationObservations,
    commonPhysicalExamination,
    physicalExaminationObservations,
    feeding,
    generalObservations,
  }) {
    return axios.post(`/api/health-controls`, {
      healthControl: {
        date,
        weight,
        pc,
        ppc,
        height,
        completeVaccines,
        vaccinesObservations,
        maturationObservations,
        commonPhysicalExamination,
        physicalExaminationObservations,
        feeding,
        generalObservations,
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

  deleteHealthControl(healthControl) {
    return axios.delete(`/api/health-controls/${healthControl}`, {
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

  enableHealthControl(healthControl) {
    return axios.post(`/api/health-controls/${healthControl}`, {
      healthControl: {
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

  updateHealthControl(healthControl, {
    date,
    weight,
    pc,
    ppc,
    height,
    completeVaccines,
    vaccinesObservations,
    maturationObservations,
    commonPhysicalExamination,
    physicalExaminationObservations,
    feeding,
    generalObservations,
  }) {
    return axios.post(`/api/health-controls/${healthControl}`, {
      healthControl: {
        date,
        weight,
        pc,
        ppc,
        height,
        completeVaccines,
        vaccinesObservations,
        maturationObservations,
        commonPhysicalExamination,
        physicalExaminationObservations,
        feeding,
        generalObservations,
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
export const healthControlsRequest = new HealthControlsRequest();
