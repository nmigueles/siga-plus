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

describe('Root API functionality', () => {
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
