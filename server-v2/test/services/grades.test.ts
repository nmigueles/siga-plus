import app from '../../src/app';

describe('\'grades\' service', () => {
  it('registered the service', () => {
    const service = app.service('grades');
    expect(service).toBeTruthy();
  });
});
