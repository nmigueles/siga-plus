import moment from 'moment-timezone';
import 'moment/locale/es';

moment.updateLocale('es');
moment.tz.setDefault('America/Argentina/Buenos_Aires');

/**
 * Devuelve el porsentage que paso entre dos horas
 * @param {Date} ahora new Date()
 * @param {string} inicio HH:mmm
 * @param {string} final HH:mm
 * @returns {number}
 */
export default function getProgressOfDates(ahora, inicio, final) {
  const horaAhora = moment(ahora, 'H:mm').valueOf();
  const horaInicio = moment(inicio, 'H:mm').valueOf();
  const horaFin = moment(final, 'H:mm').valueOf();
  return Math.round(((horaAhora - horaInicio) / (horaFin - horaInicio)) * 100);
}
