import supertest from 'supertest';

// API E2E Testing

import app from '../app';

const request = supertest(app);

describe('Basic API Functionality', () => {
  it('GET /', async done => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    done();
  });
  it('GET /notexistingroute', async done => {
    const response = await request.get('/notexistingroute');
    expect(response.status).toBe(404);
    done();
  });
  it('GET /health - Should be able to get app health', async done => {
    const response = await request.get('/health');
    expect(response.status).toBe(200);
    done();
  });
});

describe('GET /api/v1/', () => {
  it('Should respond with info about the API', async done => {
    const response = await request.get('/api/v1/');
    expect(response.status).toBe(200);
    expect(response.body.name).toBeDefined();
    expect(response.body.version).toBeDefined();
    done();
  });
});

// USER ENDPOINTS
describe('GET /user/all', () => {
  it('Should get unauthorized', async done => {
    const response = await request.get(`/api/v1/user/all`);
    expect(response.status).toBe(401);
    expect(response.body.error).toBeDefined();
    expect(response.body.error.message).toBe('Unauthorized: missing authorization token.');
    done();
  });

  it('Should get malformed token on not valid token', async done => {
    const response = await request.get(`/api/v1/user/all`).set({ Authorization: 'notvalidtoken' });
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
