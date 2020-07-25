import moment from 'moment-timezone';
import 'moment/locale/es';

moment.updateLocale('es');
moment.tz.setDefault('America/Argentina/Buenos_Aires');

/**
 * Devuelve el estado de la asignatura
 * @param {Date} ahora HH:mm
 * @param {string} inicio HH:mm
 * @param {string} final HH:mm
 */
export default function getEstadoDeAsignatura(ahora, inicio, final) {
  let termino = false;
  let enCurso = false;

  const horaAhora = moment(ahora, 'H:mm');
  const horaInicio = moment(inicio, 'H:mm');
  const horaFin = moment(final, 'H:mm');

  if (horaAhora.isBefore(horaFin)) {
    // Todavía no terminó.
    if (horaInicio.isBefore(horaAhora)) enCurso = true;
  } else {
    // Terminó
    termino = true;
  }

  const state = enCurso ? 'enCurso' : termino ? 'termino' : 'noInicio';

  return {
    state,
    hora: (termino || enCurso ? horaFin : horaInicio).format('HH:mm:ss'),
  };
}
