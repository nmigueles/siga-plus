import Nota from '../interfaces/NotaInterface';

/**
 * Convertir a un string las distintas notas e instancias.
 * @param notas Array de notas
 */
export default function notasToString(notas: Nota[]): string {
  const response = notas
    .map(({ calificacion, instancia }) => `${calificacion} en el ${instancia}`)
    .join(', ');

  return notas.length > 1 ? response.replace(/,(?=[^,]*$)/, ' y un') : response;
}
