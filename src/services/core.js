import axios from 'axios';
import axiosRetry from 'axios-retry';

const API_URL = 'https://api.github.com';

class CoreService {

  api;

  constructor() {
    this.AUTH_KEY = 'GITHUB_AUTH_TOKEN';

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

    this.api.interceptors.request.use(async config => {
      const newConfig = config;
      if (this.isAuthenticated()) {
        newConfig.headers.Authorization = `token ${this.getAuthToken()}`;
      }
    
      return newConfig;
    });

  }

  setAuthToken(auth) {
    localStorage.setItem(this.AUTH_KEY, btoa(auth));
  }

  existsAuthToken = () => {
    return this.getAuthToken() !== null;
  }

  isAuthenticated = () => localStorage.getItem(this.AUTH_KEY) !== null;

  getAuthToken = () => {
    const authLocal = localStorage.getItem(this.AUTH_KEY);
    if (authLocal === null) {
      return null;
    }
    return atob(authLocal);
  }

  getBaseUrl = () => API_URL;

  getApi = () => this.api;

}

export default CoreService;
