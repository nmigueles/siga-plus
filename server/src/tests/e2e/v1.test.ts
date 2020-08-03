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

describe('GET /api/v1/', () => {
  it('Should respond with info about the API', async done => {
    const response = await request.get('/api/v1');
    expect(response.status).toBe(200);
    expect(response.body.name).toBeDefined();
    expect(response.body.version).toBeDefined();
    done();
  });

  it('Should respond not found for unexisting route', async done => {
    const response = await request.get('/api/v1/notexistingroute');
    expect(response.status).toBe(404);
    done();
  });
});
