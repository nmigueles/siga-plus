import asignaturas from '../constants/asignaturas';
import { today } from './getOrderedWeek';

const getAsignaturasDelDia = async () => {
  const response = asignaturas.filter(a => a.dia === today);
  // Wait one second to test loading state
  await new Promise(resolve => setTimeout(resolve, 1000));
  return response;
};

export default getAsignaturasDelDia;
