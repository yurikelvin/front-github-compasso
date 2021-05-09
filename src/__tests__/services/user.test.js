import UserService from 'services/user';

describe('UserService test', () => {
  it('should return the github profile of a real user', async () => {
    const userService = new UserService();


    const response = await userService.getUserProfile('yurikelvin')

    const { data: { login }, status } = response;

    expect(login).toEqual('yurikelvin');
    expect(status).toEqual(200);

  })

  it('should return not found for a fake user of github', async () => {
    const userService = new UserService();
    await expect(userService.getUserProfile('yurikelvinnkikinn')).rejects.toThrow(Error);
  })

})