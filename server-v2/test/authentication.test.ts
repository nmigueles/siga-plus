import app from '../src/app';

describe('authentication', () => {
  it('registered the authentication service', () => {
    expect(app.service('authentication')).toBeTruthy();
  });

  describe('local strategy', () => {
    const userInfo = {
      username: 'testaccount',
      password: 'supersecret',
      fullname: 'Test Account',
      degree: 'Mock',
      locked: false,
    };

    beforeAll(async () => {
      try {
        await app.service('users').create(userInfo);
      } catch (error) {
        // Do nothing, it just means the user already exists and can be tested
      }
    });

    it('authenticates user and creates accessToken', async () => {
      const { username, password } = userInfo;
      const { user, accessToken } = await app.service('authentication').create(
        {
          strategy: 'local',
          username,
          password,
        },
        {}
      );

      expect(accessToken).toBeTruthy();
      expect(user).toBeTruthy();
    });
  });
});
