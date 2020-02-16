import asignaturas from '../constants/asignaturas';
import { today } from './getOrderedWeek';

const getAsignaturasDelDia = async () => {
  const response = asignaturas.filter(a => a.dia === today);
  const ordered = response.sort((a, b) => {
    // obj.hora has the HH:MM format (string), this function returns HH as number.
    const getHora = obj => Number(obj.hora.split(':')[0]);
    return getHora(a) - getHora(b);
  });

  // Wait one second to test loading state
  await new Promise(resolve => setTimeout(resolve, 1000));
  return ordered;
};

export default getAsignaturasDelDia;
