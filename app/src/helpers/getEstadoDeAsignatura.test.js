import getEstadoDeAsignatura from './getEstadoDeAsignatura';

describe('getEstadoDeAsignatura', () => {
  test('Debería devolver que no inicio y cuanto falta', () => {
    expect(getEstadoDeAsignatura('18:00', '8:30', '16:30')).toStrictEqual({
      state: 'termino',
      hora: '16:30:00',
    });
    expect(getEstadoDeAsignatura('15:00', '8:30', '16:30')).toStrictEqual({
      state: 'enCurso',
      hora: '16:30:00',
    });
    expect(getEstadoDeAsignatura('06:00', '8:30', '16:30')).toStrictEqual({
      state: 'noInicio',
      hora: '08:30:00',
    });
  });
});
