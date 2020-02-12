import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Row, Icon } from 'native-base';

import TimeAgo from 'react-native-timeago';
import moment from 'moment';
import 'moment/locale/es-us';

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
  iconTime: {
    fontSize: 15,
    color: Colors.strongGrey,
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
    color: Colors.strongGrey,
  },
});

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
          const duration = moment
            .duration(moment(`${horaC}00`, 'HHmmss').diff(moment(`${horaT}00`, 'HHmmss')))
            .humanize();
          const falta = moment(moment(`${horaC}00`, 'HHmmss')).fromNow();
          // eslint-disable-next-line no-unused-vars
          const [_, tiempo, escala] = /(\d\d|\d) (\w+)/g.exec(falta);
          // eslint-disable-next-line no-unused-vars
          const [__, tiempoDur, escalaDur] = /(\d\d|\d) (\w+)/g.exec(duration);

          const termino = escala === escalaDur && tiempo >= tiempoDur;

          // TODO: En curso

          return (
            <View key={id} style={[styles.card, { opacity: termino ? 0.4 : 1 }]}>
              <Text style={styles.mainText}>{nombre}</Text>
              <Row style={styles.row}>
                <Text style={styles.subText}>{`Aula ${aula} - ${sede}`}</Text>
              </Row>
              <Row>
                {termino ? (
                  <Text style={styles.timeAgo}>La clase ya termino</Text>
                ) : (
                  <Text style={styles.timeAgo}>
                    <Icon name="md-time" style={styles.iconTime} />
                    <Text>{`  ${falta}`}</Text>
                  </Text>
                )}
              </Row>
            </View>
          );
        })}
    </View>
  );
};

export default AsignaturaDelDia;
