import supertest from 'supertest';

import app from '../../app';

import { disconnect, connect } from '../../tasks/connectDb';

const request = supertest(app);

beforeAll(async done => {
  await connect();
  done();
});

afterAll(async done => {
  await disconnect();
  done();
});

describe('GET /user/all', () => {
  it('Should get unauthorized', async done => {
    const response = await request.get(`/api/v1/user/all`);
    expect(response.status).toBe(401);
    expect(response.body.error).toBeDefined();
    expect(response.body.error.message).toBe('Unauthorized: missing authorization token.');
    done();
  });

  it('Should get malformed token when not valid token was provided', async done => {
    const response = await request.get(`/api/v1/user/all`).set({ Authorization: 'notvalidtoken' });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error.message).toBe('Unauthorized: malformed token.');
    done();
  });

  it('Should get unauthorized when user has no privileges to see other users', async done => {
    const auth = await request
      .post('/api/v1/auth/login')
      .send({ username: 'test', password: 'test' });
    expect(auth.body.token).toBeDefined();
    expect(auth.body.success).toBeTruthy();
    const Authorization = `Bearer ${auth.body.token}`; // Grab token from login.
    const response = await request.get('/api/v1/user/all').set({ Authorization });
    expect(response.status).toBe(401);
    expect(response.body.error.message).toBe("Unauthorized: request out of the user's scopes.");
    done();
  });
  it('Should get all users', async done => {
    const auth = await request
      .post('/api/v1/auth/login')
      .send({ username: 'testWithPrivileges', password: 'testWithPrivileges' });
    expect(auth.body.token).toBeDefined();
    expect(auth.body.success).toBeTruthy();
    const Authorization = `Bearer ${auth.body.token}`; // Grab token from login.
    const response = await request.get('/api/v1/user/all').set({ Authorization });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    done();
  });
});

describe('GET /user/me', () => {
  it('Should get unauthorized', async done => {
    const response = await request.get(`/api/v1/user/me`);
    expect(response.status).toBe(401);
    expect(response.body.error).toBeDefined();
    expect(response.body.error.message).toBe('Unauthorized: missing authorization token.');
    done();
  });

  it('Should get malformed token on not valid token', async done => {
    const response = await request.get(`/api/v1/user/me`).set({ Authorization: 'notvalidtoken' });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error.message).toBe('Unauthorized: malformed token.');
    done();
  });

  it('Should get user', async done => {
    const auth = await request
      .post('/api/v1/auth/login')
      .send({ username: 'testWithPrivileges', password: 'testWithPrivileges' });
    expect(auth.body.token).toBeDefined();
    expect(auth.body.success).toBeTruthy();
    const Authorization = `Bearer ${auth.body.token}`; // Grab token from login.
    const response = await request.get('/api/v1/user/me').set({ Authorization });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    done();
  });
});

describe('GET /user/:id ', () => {
  it('Should get unauthorized', async done => {
    const response = await request.get(`/api/v1/user/aaaaa`);
    expect(response.status).toBe(401);
    expect(response.body.error).toBeDefined();
    expect(response.body.error.message).toBe('Unauthorized: missing authorization token.');
    done();
  });

  it('Should get malformed token on not valid token', async done => {
    const response = await request
      .get(`/api/v1/user/aaaaa`)
      .set({ Authorization: 'notvalidtoken' });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error.message).toBe('Unauthorized: malformed token.');
    done();
  });

  it('Should get unauthorized without scope', async done => {
    const auth = await request
      .post('/api/v1/auth/login')
      .send({ username: 'test', password: 'test' });
    expect(auth.body.token).toBeDefined();
    expect(auth.body.success).toBeTruthy();
    const Authorization = `Bearer ${auth.body.token}`; // Grab token from login.
    const response = await request.get('/api/v1/user/aaaaa').set({ Authorization });
    expect(response.status).toBe(401);
    expect(response.body.error.message).toBe("Unauthorized: request out of the user's scopes.");
    done();
  });

  it('Should get invalid id', async done => {
    const auth = await request
      .post('/api/v1/auth/login')
      .send({ username: 'testWithPrivileges', password: 'testWithPrivileges' });
    expect(auth.body.token).toBeDefined();
    expect(auth.body.success).toBeTruthy();
    const Authorization = `Bearer ${auth.body.token}`; // Grab token from login.
    const response = await request.get('/api/v1/user/aaaa').set({ Authorization });
    expect(response.status).toBe(500);
    expect(response.body).toBeInstanceOf(Object);
    done();
  });

  it('Should get not user found', async done => {
    const auth = await request
      .post('/api/v1/auth/login')
      .send({ username: 'testWithPrivileges', password: 'testWithPrivileges' });
    expect(auth.body.token).toBeDefined();
    expect(auth.body.success).toBeTruthy();
    const Authorization = `Bearer ${auth.body.token}`; // Grab token from login.
    const response = await request
      .get('/api/v1/user/5f27a98a0436d722a4c13d44') // Non-existing user id
      .set({ Authorization });
    expect(response.status).toBe(404);
    expect(response.body.error.message).toBe('User not found.');
    done();
  });

  it('Should get user', async done => {
    const auth = await request
      .post('/api/v1/auth/login')
      .send({ username: 'testWithPrivileges', password: 'testWithPrivileges' });
    expect(auth.body.token).toBeDefined();
    expect(auth.body.success).toBeTruthy();
    const Authorization = `Bearer ${auth.body.token}`; // Grab token from login.
    const response = await request
      .get('/api/v1/user/5f27a98a0436d722a4c13d46')
      .set({ Authorization });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    done();
  });
});

describe('POST /user/push-notifications', () => {
  it('Should get unauthorized', async done => {
    const response = await request.post(`/api/v1/user/push-notifications`);
    expect(response.status).toBe(401);
    expect(response.body.error).toBeDefined();
    expect(response.body.error.message).toBe('Unauthorized: missing authorization token.');
    done();
  });

  it('Should get malformed token on not valid token', async done => {
    const response = await request
      .post(`/api/v1/user/push-notifications`)
      .set({ Authorization: 'notvalidtoken' });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error.message).toBe('Unauthorized: malformed token.');
    done();
  });

  it('Should expect token', async done => {
    const auth = await request
      .post('/api/v1/auth/login')
      .send({ username: 'testWithPrivileges', password: 'testWithPrivileges' });
    expect(auth.body.token).toBeDefined();
    expect(auth.body.success).toBeTruthy();
    const Authorization = `Bearer ${auth.body.token}`; // Grab token from login.
    const response = await request
      .post('/api/v1/user/push-notifications')
      .set({ Authorization })
      .send({});
    expect(response.status).toBe(500);
    expect(response.body.error.message).toBe('Token missing.');
    done();
  });
  it('Should save token', async done => {
    const auth = await request
      .post('/api/v1/auth/login')
      .send({ username: 'testWithPrivileges', password: 'testWithPrivileges' });
    expect(auth.body.token).toBeDefined();
    expect(auth.body.success).toBeTruthy();
    const Authorization = `Bearer ${auth.body.token}`; // Grab token from login.
    const response = await request
      .post('/api/v1/user/push-notifications')
      .set({ Authorization })
      .send({ token: 'yay' });
    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.token).toBeDefined();
    const {
      body: { expoPushToken },
    } = await request.get('/api/v1/user/me').set({ Authorization });
    expect(expoPushToken).toBe('yay');
    done();
  });
});
