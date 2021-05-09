import CoreService from 'services/core';

describe('CoreService test', () => {

  it('should have api instance', () => {
    const coreService = new CoreService();
    const actual = coreService.getApi();
    expect(actual).not.toBeUndefined();
  })

  it('should have api with baseUrl equals https://api.github.com', () => {
    const expected = 'https://api.github.com'
    const coreService = new CoreService();
    const { defaults: { baseURL: actual } } = coreService.getApi();
    expect(actual).toEqual(expected);
  })

})