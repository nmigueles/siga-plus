import getProgressOfDates from './getProgressOfDates';

describe('getProgressOfDates', () => {
  test('Debería devolver el progreso entre dos horas', () => {
    expect(getProgressOfDates('20:00', '19:00', '21:00')).toEqual(50);
  });
  test('Debería devolver 25% cuando solo paso el 25% de la clase', () => {
    expect(getProgressOfDates('20:15', '20:00', '21:00')).toEqual(25);
  });
  test('Debería devolver 75% cuando solo paso el 75% de la clase', () => {
    expect(getProgressOfDates('20:45', '20:00', '21:00')).toEqual(75);
  });
  test('Debería devolver 75% cuando solo paso el 75% de la clase', () => {
    expect(getProgressOfDates('20:10', '20:00', '21:00')).toEqual(17);
  });
  test('Debería devolver 75% cuando solo paso el 75% de la clase', () => {
    expect(getProgressOfDates('17:23', '17:00', '17:30')).toEqual(77);
  });
});
