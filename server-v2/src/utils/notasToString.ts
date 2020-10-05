/**
 * Convertir a un string las distintas notas e instancias.
 * @param notas Array de notas
 */
export default function notasToString(notas: { value: number; instance: string }[]): string {
  const response = notas.map(({ value, instance }) => `${value} en el ${instance}`).join(', ');

  return notas.length > 1 ? response.replace(/,(?=[^,]*$)/, ' y un') : response;
}
