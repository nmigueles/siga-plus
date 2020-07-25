import moment from 'moment-timezone';

import 'moment/locale/es';

import cleanHour from './cleanHour';

moment.locale('es');
moment.tz.setDefault('America/Argentina/Buenos_Aires');

const getEstadoDeAsignatura = (ahora, inicio, final) => {
  const horaCClean = cleanHour(inicio);
  const horaTClean = cleanHour(final);

  const hora = moment(`${horaCClean}00`, 'HHmmss');
  const durationString = moment
    .duration(
      moment(`${horaCClean}00`, 'HHmmss').diff(moment(`${horaTClean}00`, 'HHmmss'))
    )
    .humanize();
  const fromNowString = moment(hora).fromNow();
  const duration = /(\d\d|\d|\w+) (\w+)/g.exec(durationString).reverse();
  const fromNow = /(\w+) (\d\d|\d|\w+) (\w+)/g.exec(fromNowString).reverse();

  let state;
  let termino = false;
  let enCurso = false;

  if (fromNow[2] === 'hace') {
    const fromNowClean =
      fromNow[1] === 'una' || fromNow[1] === 'un' ? 1 : Number(fromNow[1]);
    const durationClean =
      duration[1] === 'una' || duration[1] === 'un' ? 1 : Number(duration[1]);
    if (
      ['hora', 'horas'].includes(fromNow[0]) &&
      ['hora', 'horas'].includes(duration[0])
    ) {
      // Estan en la misma escala
      if (fromNowClean > durationClean) {
        termino = true;
        state = 'termino';
      } else {
        enCurso = true;
        state = 'enCurso';
      }
    }
    // No estan en la misma escala
    if (
      ['hora', 'horas'].includes(duration[0]) &&
      ['minuto', 'minutos'].includes(fromNow[0])
    ) {
      const durationMinutes = durationClean * 60;
      if (fromNowClean > durationMinutes) {
        termino = true;
        state = 'termino';
      } else {
        enCurso = true;
        state = 'enCurso';
      }
    } else if (
      ['hora', 'horas'].includes(fromNow[0]) &&
      ['minuto', 'minutos'].includes(duration[0])
    ) {
      const fromNowMinutes = fromNowClean * 60;
      if (fromNowMinutes > durationClean) {
        termino = true;
        state = 'termino';
      } else {
        enCurso = true;
        state = 'enCurso';
      }
    } else if (fromNow[0] === 'segundos' || fromNow[0] === 'segundo') {
      enCurso = true;
      state = 'enCurso';
    }
  }

  return {
    state,
    termino,
    enCurso,
    hora: moment(`${horaTClean}00`, 'HHmmss').format('H:mm:ss'),
  };
};

module.exports = getEstadoDeAsignatura;