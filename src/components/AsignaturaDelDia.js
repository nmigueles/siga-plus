import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Row, Icon } from 'native-base';

import moment from 'moment';
import 'moment/locale/es-us';
import TimeAgo from 'react-native-timeago';

import Colors from '../constants/colors';
import Styles from '../constants/styles';
import Card from './Card';

import getAsignaturasDelDia from '../utils/getAsignaturasDelDia';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
  },
  enCurso: {
    color: Colors.success,
  },
  mainText: {
    fontSize: 25,
  },
  subText: {
    fontSize: 15,
  },
  row: {
    marginTop: 3,
    marginBottom: 10,
  },
  text: {
    color: Colors.strongGrey,
    paddingLeft: 20,
    marginBottom: 10,
    marginTop: 20,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  timeAgo: {
    flex: 1,
    color: Colors.strongGrey,
    paddingBottom: 5,
  },
});

const getEstadoDeMateria = (horaC, horaT) => {
  const horaCClean = horaC.replace(':', '');
  const horaTClean = horaT.replace(':', '');
  const durationString = moment
    .duration(
      moment(`${horaCClean}00`, 'HHmmss').diff(moment(`${horaTClean}00`, 'HHmmss'))
    )
    .humanize();
  const hora = moment(`${horaCClean}00`, 'HHmmss');
  const fromNowString = moment(hora).fromNow();
  const duration = /(\d\d|\d) (\w+)/g.exec(durationString).reverse();
  const fromNow = /(\w+) (\d\d|\d|\w+) (\w+)/g.exec(fromNowString).reverse();

  let termino = false;
  let enCurso = false;

  if (fromNow[2] === 'hace') {
    const fromNowClean =
      fromNow[1] === 'una' || fromNow[1] === 'un' ? 1 : Number(fromNow[1]);
    const durationClean =
      duration[1] === 'una' || duration[1] === 'un' ? 1 : Number(duration[1]);

    if (fromNow[0] === duration[0]) {
      // Estan en la misma escala
      if (fromNowClean > durationClean) {
        termino = true;
      } else {
        enCurso = true;
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
      } else {
        enCurso = true;
      }
    } else if (
      ['hora', 'horas'].includes(fromNow[0]) &&
      ['minuto', 'minutos'].includes(duration[0])
    ) {
      const fromNowMinutes = fromNowClean * 60;
      if (fromNowMinutes > durationClean) {
        termino = true;
      } else {
        enCurso = true;
      }
    } else if (fromNow[0] === 'segundos' || fromNow[0] === 'segundo') enCurso = true;
  }

  return { termino, enCurso, hora };
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
      <Text style={styles.text}>Hoy</Text>

      {loading && <ActivityIndicator />}

      {!loading && !asignaturas.length && (
        <Card message={'No hay ninguna asignatura hoy.'} icon="terrain" />
      )}
      {!loading &&
        asignaturas.map(({ id, nombre, aula, sede, hora: horaC, horaT }) => {
          try {
            const { termino, enCurso, hora } = getEstadoDeMateria(horaC, horaT);
            return (
              <View key={id} style={[Styles.card]}>
                <Text
                  style={[
                    styles.mainText,
                    { color: termino ? Colors.strongGrey : Colors.main },
                  ]}
                >
                  {nombre}
                </Text>
                <Row style={styles.row}>
                  <Text
                    style={[
                      styles.subText,
                      { color: termino ? Colors.strongGrey : Colors.main },
                    ]}
                  >{`Aula ${aula} - ${sede}`}</Text>
                </Row>
                <Row>
                  {termino ? (
                    <>
                      <Icon name="update" type={'MaterialIcons'} style={[Styles.icon]} />
                      <Text style={styles.timeAgo}> La clase ya terminó</Text>
                    </>
                  ) : enCurso ? (
                    <>
                      <Icon
                        name="timelapse"
                        type={'MaterialIcons'}
                        style={[Styles.icon, styles.enCurso]}
                      />
                      <Text style={[styles.timeAgo, styles.enCurso]}>{' en curso'}</Text>
                    </>
                  ) : (
                    <>
                      <Icon
                        name="access-time"
                        type={'MaterialIcons'}
                        style={Styles.icon}
                      />
                      <Text style={styles.timeAgo}>
                        {' '}
                        <TimeAgo time={hora} />
                      </Text>
                    </>
                  )}
                </Row>
              </View>
            );
          } catch (error) {
            return (
              <Card id={id} message={'Error cargando la asignatura'} nombre={nombre} />
            );
          }
        })}
    </View>
  );
};

export default AsignaturaDelDia;
