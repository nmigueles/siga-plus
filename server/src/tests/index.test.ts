import 'jest';

import notasToString from '../helpers/notasToString';
import Nota from '../interfaces/NotaInterface';

describe('Notas to string', () => {
  test('Debería devolver un string', () => {
    const notas: Nota[] = [
      {
        instancia: 'PP',
        calificacion: 8,
      },
    ];
    expect(notasToString(notas)).toEqual('8 en el PP');
  });

  test('Debería devolver un string combinado de varias notas.', () => {
    const notas: Nota[] = [
      {
        instancia: 'PP',
        calificacion: 8,
      },
      {
        instancia: 'SP',
        calificacion: 8,
      },
    ];
    expect(notasToString(notas)).toEqual('8 en el PP y un 8 en el SP');
  });
  test('Debería devolver un string combinado de varias notas.', () => {
    const notas: Nota[] = [
      {
        instancia: 'PP',
        calificacion: 8,
      },
      {
        instancia: 'SP',
        calificacion: 8,
      },
      {
        instancia: 'PRPP',
        calificacion: 8,
      },
    ];
    expect(notasToString(notas)).toEqual('8 en el PP, 8 en el SP y un 8 en el PRPP');
  });
});
