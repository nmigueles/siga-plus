const getEstadoDeAsignatura = require('./getEstadoDeAsignatura');

describe('getEstadoDeAsignatura', () => {
  test('Debería devolver que no inicio y cuanto falta', () => {
    expect(getEstadoDeAsignatura('18:00', '8:30', '16:30')).toStrictEqual({
      enCurso: false,
      termino: true,
      hora: '16:30:00',
    });
    expect(getEstadoDeAsignatura('15:00', '8:30', '16:30')).toStrictEqual({
      enCurso: true,
      termino: false,
      hora: '16:30:00',
    });
    expect(getEstadoDeAsignatura('06:00', '8:30', '16:30')).toStrictEqual({
      enCurso: false,
      termino: false,
      hora: '08:30:00',
    });
  });
});
