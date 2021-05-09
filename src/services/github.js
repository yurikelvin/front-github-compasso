import axios from 'axios';
import axiosRetry from 'axios-retry';

import CoreService from 'services/core';

const API_URL = 'https://github.com/login/oauth';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

class GithubService extends CoreService {

  api;
  client_id;
  client_secret;

  constructor() {
    super();
    this.AUTH_KEY = 'GITHUB_AUTH_TOKEN';

    this.client_id = CLIENT_ID;
    this.client_secret = CLIENT_SECRET;

    this.api = axios.create({
      baseURL: `https://cors-compasso.herokuapp.com/${API_URL}`,
      timeout: 1000 * 30,
    });

    axiosRetry(this.api, {
      retries: 3, // number of retries
      retryDelay: retryCount => {
        return retryCount * 2000; // time interval between retries
      },
    });

  }

  getAuthURL = () => {
    return `${API_URL}/authorize?client_id=${this.getClientId()}&redirect_uri=http://localhost:3000/auth`
  }

  retrieveGithubTokenFromAPI = async code => {
    try {
      const response = await this.getApi().post('/access_token', {}, {
        params: {
          client_id: this.getClientId(),
          client_secret: this.getClientSecret(),
          code: code
        },
        headers: {
          'Accept': 'application/json'
        }
      })

      const { data: { access_token } } = response;

      if (access_token) {
        this.setAuthToken(access_token);
      }
    } catch (e) {
      // TODO: Handle Error
    }
  }

  getClientId = () => {
    return this.client_id;
  }

  getClientSecret = () => {
    return this.client_secret;
  }
}

export default GithubService;