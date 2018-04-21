import Cookies from 'js-cookie';
import CONFIG from './config';

export class AuthToken {

  /**
   * ## AuthToken
   *
   * set the key from the config
   */
  constructor() {
    this.SESSION_TOKEN_KEY = CONFIG.SESSION_TOKEN_KEY
  }

  /**
   * ### storeSessionToken
   * Store the session key
   */
  storeSessionToken(sessionToken) {
    Cookies.set(this.SESSION_TOKEN_KEY, sessionToken, {path: '/'});
    return Promise.resolve();
  }

  /**
   * ### getSessionToken
   * @param {Object} sessionToken the currentUser object
   *
   * When Hot Loading, the sessionToken  will be passed in, and if so,
   * it needs to be stored on the device.  Remember, the store is a
   * promise so, have to be careful.
   */
  getSessionToken(sessionToken) {
    if (sessionToken) {
      Cookies.set(this.SESSION_TOKEN_KEY, sessionToken, {path:'/'});
    }
    return Promise.resolve(Cookies.get(this.SESSION_TOKEN_KEY, {path:'/'}));
  }

  /**
   * ### deleteSessionToken
   * Deleted during log out
   */
  deleteSessionToken() {
    return Promise.resolve(Cookies.remove(this.SESSION_TOKEN_KEY, {path:'/'}));
  }
}

// The singleton variable
export const authToken = new AuthToken();
