import CoreService from 'services/core';

class UserService extends CoreService {

  getUserProfile = async username => {
    return this.getApi().get(`/users/${username}`);
  }
}

export default UserService;