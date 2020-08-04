import supertest from 'supertest';

import app from '../../app';

import { connect, disconnect } from '../../tasks/connectDb';

const request = supertest(app);

beforeAll(async done => {
  await connect();
  done();
});

afterAll(async done => {
  await disconnect();
  done();
});

describe('GET /course', () => {
  it('Should require login', async done => {
    const response = await request.get('/api/v1/course');
    expect(response.status).toBe(401);
    expect(response.body.error.message).toBe('Unauthorized: missing authorization token.');
    done();
  });

  it('Should retrieve user courses', async done => {
    const auth = await request
      .post('/api/v1/auth/login')
      .send({ username: 'test', password: 'test' });
    expect(auth.body.token).toBeDefined();
    expect(auth.body.success).toBeTruthy();
    const Authorization = `Bearer ${auth.body.token}`; // Grab token from login.
    const response = await request.get('/api/v1/course').set({ Authorization });
    expect(response.status).toBe(200);
    done();
  });
});
