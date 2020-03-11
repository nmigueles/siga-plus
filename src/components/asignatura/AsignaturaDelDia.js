import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import moment from 'moment';
import 'moment/locale/es-us';

import getAsignaturasDelDia from '../../utils/getAsignaturasDelDia';

import Colors from '../../constants/colors';

import Card from '../base/Card';
import TextSeparator from '../base/TextSeparator';

import CardAsignatura from './CardAsignatura';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
  },
  text: {
    color: Colors.strongGrey,
    paddingLeft: 20,
    marginBottom: 10,
    marginTop: 20,
    textTransform: 'uppercase',
    fontSize: 12,
  },
});

const cleanHour = hour => {
  const hourPlain = hour.replace(':', '');
  if ([...hourPlain].length === 3) return `0${hourPlain}`.replace(':', '');
  return hourPlain;
};

const getEstadoDeAsignatura = (horaC, horaT) => {
  const horaCClean = cleanHour(horaC);
  const horaTClean = cleanHour(horaT);
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
    hora: moment(`${horaTClean}00`, 'HHmmss'),
  };
};

const AsignaturaDelDia = () => {
  const [loading, setLoading] = useState(true);
  const [asignaturas, setAsignaturas] = useState([]);

  useEffect(() => {
    async function preload() {
      setAsignaturas(await getAsignaturasDelDia());
      setLoading(false);
    }
    preload();

    const interval = setInterval(async () => {
      await preload();
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  moment.locale('es-us');

  return (
    <View style={styles.container}>
      <TextSeparator title="Hoy" />

      {loading && <ActivityIndicator />}

      {!loading && !asignaturas.length && (
        <Card message={'No hay ninguna asignatura hoy.'} icon="terrain" />
      )}
      {!loading &&
        asignaturas.map(asignatura => {
          try {
            const { state, hora } = getEstadoDeAsignatura(
              asignatura.hora[0],
              asignatura.horaT[0]
            );
            return (
              <CardAsignatura
                key={asignatura._id}
                asignatura={asignatura}
                hora={hora}
                state={state}
              />
            );
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log('Error cargando materia del dia: ', error);
            return (
              <Card
                key={asignatura._id}
                message={'Error cargando la asignatura.'}
                nombre={asignatura.nombre}
              />
            );
          }
        })}
    </View>
  );
};

export default AsignaturaDelDia;
