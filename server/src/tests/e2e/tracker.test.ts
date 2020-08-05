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

describe('POST /api/v1/tracker/event/:user_id', () => {
  it('Should require data field', async done => {
    const response = await request.post('/api/v1/tracker/event/invalidId');
    expect(response.status).toBe(400);
    expect(response.body.error.message).toBe('Event data is required.');
    done();
  });

  it('Should require event field', async done => {
    const response = await request
      .post('/api/v1/tracker/event/invalidId')
      .send({ data: { foo: 'bar' } });
    expect(response.status).toBe(400);
    expect(response.body.error.message).toBe('Event type is required.');
    done();
  });

  it('Should validate the format of the userId', async done => {
    const response = await request
      .post('/api/v1/tracker/event/invalidId')
      .send({ data: { foo: 'bar' }, event: 'nonexistingevent' });
    expect(response.body.error.message).toBe('Invalid id format.');
    expect(response.status).toBe(500);
    done();
  });

  it("Should fail if event doesn't exists", async done => {
    const response = await request
      .post('/api/v1/tracker/event/5f18de593bc7da3320042f16')
      .send({ data: { foo: 'bar' }, event: 'nonexistingevent' });
    expect(response.body.error.message).toBe('Invalid event.');
    expect(response.status).toBe(422);
    done();
  });

  it('Should expect data field to contain event related data', async done => {
    const response = await request
      .post('/api/v1/tracker/event/5f18de593bc7da3320042f16')
      .send({ data: { foo: 'bar' }, event: 'new-grade' });
    expect(response.body.error.message).toBe('Grades are required in new-grade event.');
    expect(response.status).toBe(400);
    done();
  });

  it('Should expect data field to contain event related data', async done => {
    const response = await request
      .post('/api/v1/tracker/event/5f18de593bc7da3320042f16')
      .send({ data: { foo: 'bar' }, event: 'new-course' });
    expect(response.body.error.message).toBe('Courses are required in new-course event.');
    expect(response.status).toBe(400);
    done();
  });

  it('Should validate event data field', async done => {
    const response = await request
      .post('/api/v1/tracker/event/5f18de593bc7da3320042f16')
      .send({ data: { courses: [{ xd: 'xd' }] }, event: 'new-course' });
    expect(response.body.error.message).toBe(
      'Course validation failed: sede: Path `sede` is required., aula: Path `aula` is required., turno: Path `turno` is required., curso: Path `curso` is required., color: Path `color` is required., nombre: Path `nombre` is required., courseId: Path `courseId` is required.'
    );
    expect(response.status).toBe(400);
    done();
  });

  it('Should success firing an event with correct data', async done => {
    const response = await request.post('/api/v1/tracker/event/5f18de593bc7da3320042f16').send({
      data: {
        courses: [
          {
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
          },
        ],
      },
      event: 'new-course',
    });

    expect(response.status).toBe(200);
    done();
  });
});
