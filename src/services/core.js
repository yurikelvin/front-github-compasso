import axios from 'axios';
import axiosRetry from 'axios-retry';

const API_URL = 'https://api.github.com';

class CoreService {

  api;

  constructor() {
    this.AUTH_KEY = 'POWERDOC_AUTH';
    this.USER_KEY = 'POWERDOC_USER';

    this.api = axios.create({
      baseURL: API_URL,
      timeout: 1000 * 30,
    });

    axiosRetry(this.api, {
      retries: 3, // number of retries
      retryDelay: retryCount => {
        return retryCount * 2000; // time interval between retries
      },
    });
  }

  getApi = () => this.api;

}

export default CoreService;
