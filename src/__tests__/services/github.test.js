import GithubService from 'services/github';

describe('GithubService test', () => {
  it('should have client_id', () => {
    const githubService = new GithubService();
    const actual = githubService.getClientId();
    expect(actual).not.toBeUndefined();
  })

  it('should have client_secret', () => {
    const githubService = new GithubService();
    const actual = githubService.getClientSecret();
    expect(actual).not.toBeUndefined();
  })
})