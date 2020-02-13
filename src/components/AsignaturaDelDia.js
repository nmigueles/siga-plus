import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Row, Icon } from 'native-base';

import moment from 'moment';
import 'moment/locale/es-us';
import TimeAgo from 'react-native-timeago';

import Colors from '../constants/colors';
import getAsignaturasDelDia from '../utils/getAsignaturasDelDia';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Colors.white2,
    borderBottomColor: Colors.grey2,
    borderBottomWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 5,
  },
  icon: {
    fontSize: 15,
    color: Colors.strongGrey,
    marginTop: 3,
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
  error: {
    color: Colors.strongGrey,
    fontSize: 10,
    lineHeight: 20,
  },
});

const getEstadoDeMateria = (horaC, horaT) => {
  const durationString = moment
    .duration(moment(`${horaC}00`, 'HHmmss').diff(moment(`${horaT}00`, 'HHmmss')))
    .humanize();
  const hora = moment(`${horaC}00`, 'HHmmss');
  const fromNowString = moment(hora).fromNow();
  const duration = /(\d\d|\d) (\w+)/g.exec(durationString).reverse();
  const fromNow = /(\w+) (\d\d|\d|\w+) (\w+)/g.exec(fromNowString).reverse();

  let termino = false;
  let enCurso = false;

  if (fromNow[2] === 'hace') {
    const fromNowClean =
      fromNow[1] === 'una' || fromNow[1] === 'un' ? 1 : Number(fromNow[1]);

    if (fromNow[0] === duration[0]) {
      // Estan en la misma escala
      if (fromNowClean > Number(duration[1])) {
        termino = true;
      } else {
        enCurso = true;
      }
    }
    // No estan en la misma escala
    if (fromNow[0] === 'minutos' && duration[0] === 'horas') {
      const durationMinutes = Number(duration[1]) * 60;
      if (fromNowClean > durationMinutes) {
        termino = true;
      } else {
        enCurso = true;
      }
    } else if (fromNow[0] === 'segundos') enCurso = true;
  }

  return { termino, enCurso, hora };
};

const AsignaturaDelDia = () => {
  const [loading, setLoading] = useState(true);
  const [asignaturas, setAsignaturas] = useState([]);

  useEffect(() => {
    async function anyNameFunction() {
      setAsignaturas(await getAsignaturasDelDia());
      setLoading(false);
    }
    anyNameFunction();
  }, []);

  moment.locale('es-us');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hoy</Text>
      {loading && <ActivityIndicator />}
      {!loading &&
        asignaturas.map(({ id, nombre, aula, sede, horaC, horaT }) => {
          try {
            const { termino, enCurso, hora } = getEstadoDeMateria(horaC, horaT);
            return (
              <View key={id} style={[styles.card, { opacity: termino ? 0.4 : 1 }]}>
                <Text style={styles.mainText}>{nombre}</Text>
                <Row style={styles.row}>
                  <Text style={styles.subText}>{`Aula ${aula} - ${sede}`}</Text>
                </Row>
                <Row>
                  {termino ? (
                    <Text style={styles.timeAgo}>La clase ya termino</Text>
                  ) : enCurso ? (
                    <>
                      <Icon
                        name="timelapse"
                        type={'MaterialIcons'}
                        style={[styles.icon, styles.enCurso]}
                      />
                      <Text style={[styles.timeAgo, styles.enCurso]}>{'  en curso'}</Text>
                    </>
                  ) : (
                    <>
                      <Icon
                        name="access-time"
                        type={'MaterialIcons'}
                        style={styles.icon}
                      />
                      <Text style={styles.timeAgo}>
                        {'  '}
                        <TimeAgo time={hora} />
                      </Text>
                    </>
                  )}
                </Row>
              </View>
            );
          } catch (error) {
            return (
              <View
                key={id}
                style={[
                  styles.card,
                  {
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  },
                ]}
              >
                <Icon
                  name="error"
                  type={'MaterialIcons'}
                  style={[styles.icon, { marginHorizontal: 5 }]}
                />
                <Text
                  style={styles.error}
                >{`Error cargando la asignatura ${nombre}`}</Text>
              </View>
            );
          }
        })}
    </View>
  );
};

export default AsignaturaDelDia;
