const cleanHour = require('./cleanHour');

describe('Clean Hour Suite', () => {
  test('Debería devolver la hora limpia', () => {
    expect(cleanHour('16:30')).toEqual('1630');
  });
  test('Debería devolver la hora limpia con un cero adelante', () => {
    expect(cleanHour('6:30')).toEqual('0630');
  });
});
