import CoreService from 'services/core';

class RepositoryService extends CoreService {

  getRepositories = async (username, page, perPage) => {
    return this.getApi().get(`/users/${username}/repos`, {
      params: {
        sort: 'created',
        per_page: perPage,
        page,
      }
    })
  }

  getStarredRepositories = (username, page, perPage) => {
    return this.getApi().get(`/users/${username}/starred`, {
      params: {
        sort: 'created',
        per_page: perPage,
        page,
      }
    })
  }
}

export default RepositoryService;