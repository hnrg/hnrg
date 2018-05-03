import axios from 'axios';

export default class AuthRequest {
  login({ email, password }) {
    return axios.post('/api/auth/login', { email, password }).then((response) => {
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
export const authRequest = new AuthRequest();
