import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, Row } from 'native-base';
import TimeAgo from 'react-native-timeago';

import Colors from '../constants/colors';
import Styles from '../constants/styles';

const styles = StyleSheet.create({
  enCurso: {
    color: Colors.success,
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
    paddingBottom: 5,
  },
});

const CardAsignatura = ({ asignatura, hora, state }) => {
  const { nombre, aula, sede } = asignatura;
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
            <Icon
              name="timelapse"
              type={'MaterialIcons'}
              style={[Styles.icon, styles.enCurso]}
            />
            <Text style={[styles.timeAgo, styles.enCurso]}>{' en curso'}</Text>
          </>
        );
      default:
        return (
          <>
            <Icon name="access-time" type={'MaterialIcons'} style={Styles.icon} />
            <Text style={styles.timeAgo}>
              {' '}
              <TimeAgo time={hora} />
            </Text>
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
