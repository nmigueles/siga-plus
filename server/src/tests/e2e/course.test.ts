import supertest from 'supertest';
import mongoose from 'mongoose';

import app from '../../app';

import { connect, disconnect } from '../../tasks/connectDb';
import CourseModel from '../../models/Course';

const request = supertest(app);

beforeAll(async done => {
  await connect();
  // Drop course collection
  await CourseModel.deleteMany({});
  done();
});

afterAll(async done => {
  await disconnect();
  done();
});

describe('GET /course', () => {
  it('Should require authorization header', async done => {
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

describe('POST /course/create', () => {
  it('Should require authorization header', async done => {
    const response = await request.post('/api/v1/course/create');
    expect(response.status).toBe(401);
    expect(response.body.error.message).toBe('Unauthorized: missing authorization token.');
    done();
  });

  it('Should validate the a body', async done => {
    const auth = await request
      .post('/api/v1/auth/login')
      .send({ username: 'test', password: 'test' });
    expect(auth.body.token).toBeDefined();
    expect(auth.body.success).toBeTruthy();
    const Authorization = `Bearer ${auth.body.token}`; // Grab token from login.
    const response = await request.post('/api/v1/course/create').set({ Authorization });
    expect(response.status).toBe(400);
    const errors = response.body.error.message.split('. ');
    expect(errors).toContain('"userId" is required');
    expect(errors).toContain('"courseId" is required');
    expect(errors).toContain('"curso" is required');
    expect(errors).toContain('"dia" is required');
    expect(errors).toContain('"turno" is required');
    expect(errors).toContain('"hora" is required');
    expect(errors).toContain('"horaT" is required');
    expect(errors).toContain('"aula" is required');
    expect(errors).toContain('"sede" is required');
    done();
  });

  it('Should validate all fields type', async done => {
    const auth = await request
      .post('/api/v1/auth/login')
      .send({ username: 'test', password: 'test' });
    expect(auth.body.token).toBeDefined();
    expect(auth.body.success).toBeTruthy();
    const Authorization = `Bearer ${auth.body.token}`; // Grab token from login.
    const invalidCourse = {
      userId: 1,
      courseId: 1,
      curso: 1,
      nombre: 1,
      color: 1,
      turno: 'Tardecita',
      notas: 1,
      dia: 1,
      hora: 1,
      horaT: 1,
      aula: 1,
      sede: 1,
      estado: 1,
    };
    const response = await request
      .post('/api/v1/course/create')
      .set({ Authorization })
      .send({ ...invalidCourse });
    expect(response.status).toBe(400);
    const errors = response.body.error.message.split('. ');

    expect(errors).toContain('"userId" must be a string');
    expect(errors).toContain('"courseId" must be a string');
    expect(errors).toContain('"curso" must be a string');
    expect(errors).toContain('"nombre" must be a string');
    expect(errors).toContain('"color" must be a string');
    expect(errors).toContain('"aula" must be a string');
    expect(errors).toContain('"sede" must be a string');
    expect(errors).toContain('"estado" must be a string');
    expect(errors).toContain('"notas" must be an array');
    expect(errors).toContain('"dia" must be an array');
    expect(errors).toContain('"hora" must be an array');
    expect(errors).toContain('"horaT" must be an array');
    expect(errors).toContain('"turno" must be one of [Mañana, Tarde, Noche]');
    done();
  });

  it('Should create a new course', async done => {
    const auth = await request
      .post('/api/v1/auth/login')
      .send({ username: 'test', password: 'test' });
    expect(auth.body.token).toBeDefined();
    expect(auth.body.success).toBeTruthy();
    const Authorization = `Bearer ${auth.body.token}`; // Grab token from login.
    const validCourse = {
      userId: '5f18de593bc7da3320042f16',
      courseId: '082021',
      curso: 'K1001',
      nombre: 'Test',
      aula: 'S06',
      sede: 'Campus',
      turno: 'Mañana',
      color: '#7A94CF',
      dia: [3],
      hora: ['8:30'],
      horaT: ['12:30'],
      estado: 'Cursando',
    };
    const response = await request
      .post('/api/v1/course/create')
      .set({ Authorization })
      .send({ ...validCourse });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    done();
  });

  it('Should validate if course already exist', async done => {
    const auth = await request
      .post('/api/v1/auth/login')
      .send({ username: 'test', password: 'test' });
    expect(auth.body.token).toBeDefined();
    expect(auth.body.success).toBeTruthy();
    const Authorization = `Bearer ${auth.body.token}`; // Grab token from login.
    const validCourse = {
      userId: '5f18de593bc7da3320042f16',
      courseId: '082021',
      curso: 'K1001',
      nombre: 'Test',
      aula: 'S06',
      sede: 'Campus',
      turno: 'Mañana',
      color: '#7A94CF',
      dia: [3],
      hora: ['8:30'],
      horaT: ['12:30'],
      estado: 'Cursando',
    };
    const response = await request
      .post('/api/v1/course/create')
      .set({ Authorization })
      .send({ ...validCourse });
    expect(response.status).toBe(409);
    expect(response.body.error.message).toBe('Course already exists.');
    done();
  });
});

describe('POST /course/notas/:id', () => {
  it('Should require authorization header', async done => {
    const response = await request.post('/api/v1/course/notas/082021');
    expect(response.status).toBe(401);
    expect(response.body.error.message).toBe('Unauthorized: missing authorization token.');
    done();
  });

  it('Should validate the a body', async done => {
    const auth = await request
      .post('/api/v1/auth/login')
      .send({ username: 'test', password: 'test' });
    expect(auth.body.token).toBeDefined();
    expect(auth.body.success).toBeTruthy();
    const Authorization = `Bearer ${auth.body.token}`; // Grab token from login.
    const response = await request.post('/api/v1/course/notas/082021').set({ Authorization });
    expect(response.status).toBe(400);
    expect(response.body.error.message).toBe('Expected an array of grades.');
    done();
  });

  it('Should create a new grade', async done => {
    const auth = await request
      .post('/api/v1/auth/login')
      .send({ username: 'test', password: 'test' });
    expect(auth.body.token).toBeDefined();
    expect(auth.body.success).toBeTruthy();
    const Authorization = `Bearer ${auth.body.token}`; // Grab token from login.
    // Get user courses to get the course id
    const courses = await request.get('/api/v1/course').set({ Authorization });
    expect(courses.status).toBe(200);
    expect(courses.body).toBeInstanceOf(Array);
    expect(courses.body[0]._id).toBeDefined();

    const { _id } = courses.body[0];
    const notas = [
      {
        instancia: 'PP',
        calificacion: 1,
      },
    ];
    const response = await request
      .post(`/api/v1/course/notas/${_id}`)
      .set({ Authorization })
      .send({ notas });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    done();
  });
});
