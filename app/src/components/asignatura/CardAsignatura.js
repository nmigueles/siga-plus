import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, Row } from 'native-base';
import TimeAgo from 'react-native-timeago';
import moment from 'moment-timezone';

import Colors from '../../constants/colors';
import Styles from '../../constants/styles';

import getProgressOfDates from '../../helpers/getProgressOfDates';

import ProgressBar from './ProgressBar';

const styles = StyleSheet.create({
  enCurso: {
    color: Colors.green2,
  },
  mainText: {
    fontSize: 20,
  },
  subText: {
    fontSize: 15,
  },
  row: {
    marginTop: 3,
    marginBottom: 10,
  },
  timeAgo: {
    flex: 1,
    color: Colors.strongGrey,
    paddingBottom: 7,
  },
});

const CardAsignatura = ({ asignatura, hora: horaObjetivo, state }) => {
  const { nombre, aula, sede, hora, horaT } = asignatura;
  const ahora = moment().format('HH:mm');
  const progress = getProgressOfDates(ahora, hora[0], horaT[0]);

  const switchState = () => {
    switch (state) {
      case 'termino':
        return (
          <>
            <Icon
              name="update"
              type={'MaterialIcons'}
              style={[Styles.icon, { marginTop: -7 }]}
            />
            <Text style={[styles.timeAgo, { marginTop: -10 }]}> La clase ya terminó</Text>
          </>
        );
      case 'enCurso':
        return (
          <>
            <View style={{ width: '100%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'flex-end',
                }}
              >
                <Text style={[styles.timeAgo, styles.enCurso]}>{'Clase en curso'}</Text>
                <Text
                  style={[styles.timeAgo, { flex: 0, fontSize: 11, color: Colors.main }]}
                >
                  {horaObjetivo.slice(0, 5)} hs
                </Text>
              </View>
              <ProgressBar {...{ progress }} />
            </View>
          </>
        );
      case 'noInicio':
        return (
          <>
            <Icon name="access-time" type={'MaterialIcons'} style={Styles.icon} />
            <Text style={styles.timeAgo}>
              {' '}
              <TimeAgo
                time={moment(horaObjetivo, 'HH:mm:ss').tz(
                  'America/Argentina/Buenos_Aires',
                  true
                )}
              />
            </Text>
          </>
        );
      default:
        return (
          <>
            <Icon name="access-time" type={'MaterialIcons'} style={Styles.icon} />
            <Text style={styles.timeAgo}>Default state</Text>
          </>
        );
    }
  };
  return (
    <View style={[Styles.card]}>
      <Text
        style={[
          styles.mainText,
          { color: state === 'termino' ? Colors.strongGrey : Colors.main },
        ]}
        numberOfLines={1}
      >
        {nombre}
      </Text>
      <Row style={styles.row}>
        {state !== 'termino' && (
          <Text style={styles.subText}>{`Aula ${aula} - ${sede}`}</Text>
        )}
      </Row>
      <Row>{switchState(state)}</Row>
    </View>
  );
};

CardAsignatura.propTypes = {
  hora: PropTypes.any.isRequired,
  asignatura: PropTypes.object.isRequired,
  state: PropTypes.any,
};

export default CardAsignatura;
