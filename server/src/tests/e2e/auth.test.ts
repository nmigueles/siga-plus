import supertest from 'supertest';

import app from '../../app';

import { connect, disconnect } from '../../tasks/connectDb';
import User from '../../models/User';

const request = supertest(app);

beforeAll(async done => {
  await connect();
  await User.deleteOne({ username: 'register' });
  done();
});

afterAll(async done => {
  await disconnect();
  done();
});

describe('POST /auth/login', () => {
  it('Should require username and passwords fields', async done => {
    const response = await request.post('/api/v1/auth/login');
    expect(response.status).toBe(400);
    expect(response.body.error.message).toBe('"username" is required. "password" is required');
    done();
  });

  it('Should require username fields', async done => {
    const response = await request.post('/api/v1/auth/login').send({ password: 'password' });
    expect(response.status).toBe(400);
    expect(response.body.error.message).toBe('"username" is required');
    done();
  });

  it('Should require password fields', async done => {
    const response = await request.post('/api/v1/auth/login').send({ username: 'username' });
    expect(response.status).toBe(400);
    expect(response.body.error.message).toBe('"password" is required');
    done();
  });

  it('Should respond with Unprocessable Entity for invalid credentials', async done => {
    const invalidCreds = { username: 'username', password: 'password' };
    const response = await request.post('/api/v1/auth/login').send(invalidCreds);
    expect(response.status).toBe(422);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBe('User credentials are invalid.');
    done();
  });

  it('Should log in with valid credentilas', async done => {
    const validCreds = { username: 'test', password: 'test' };
    const response = await request.post('/api/v1/auth/login').send(validCreds);
    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.token).toBeDefined();
    done();
  });
});

describe('POST /auth/register', () => {
  it('Should register a new user', async done => {
    const newUser = { name: 'register test', username: 'register', password: 'register' };
    const response = await request.post('/api/v1/auth/register').send(newUser);
    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.user).toBeDefined();
    done();
  });

  it('Should not register a user if it already exists', async done => {
    const newUser = { name: 'register test', username: 'register', password: 'register' };
    const response = await request.post('/api/v1/auth/register').send(newUser);
    expect(response.status).toBe(409);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBe('User already exists.');
    done();
  });

  // TODO Implement register restrictions like password length, required fields, etc.
});

describe('POST /auth/verify-user-token', () => {
  it('Should expect a token', async done => {
    const response = await request.post('/api/v1/auth/verify-user-token');
    expect(response.status).toBe(400);
    expect(response.body.error.message).toBe('Missing user token in request.');
    done();
  });

  it('Should respond with Unprocessable Entity for invalid token', async done => {
    const token = 'invalidtoken';
    const response = await request.post('/api/v1/auth/verify-user-token').send({ token });
    expect(response.status).toBe(422);
    expect(response.body.valid).toBeFalsy();
    expect(response.body.reason).toBe('Malformed user token.');
    done();
  });

  it('Should check if token is expired', async done => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqaWQiOiI1ZjI3YTk4YTA0MzZkNzIyYTRjMTNkNDYiLCJpYXQiOjE1OTY0MzcyNTQsImV4cCI6MTU5NjQ0MDg1NH0.ajdHTgG2oWBhF-h9D-mVPIgGHrmHupQjtX85HlE0Brc';
    const response = await request.post('/api/v1/auth/verify-user-token').send({ token });
    expect(response.status).toBe(200);
    expect(response.body.valid).toBeFalsy();
    expect(response.body.reason).toBe('jwt expired');
    done();
  });

  it('Should check if token is valid', async done => {
    const validCreds = { username: 'test', password: 'test' };
    const login = await request.post('/api/v1/auth/login').send(validCreds);
    const token = login.body.token;
    const response = await request.post('/api/v1/auth/verify-user-token').send({ token });
    expect(response.status).toBe(200);
    expect(response.body.valid).toBeDefined();
    expect(response.body.valid).toBeTruthy();
    done();
  });
});
