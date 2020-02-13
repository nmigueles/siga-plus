import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { HeaderBackButton } from 'react-navigation-stack';
import { Icon } from 'native-base';

import { WeekDays } from '../utils/getOrderedWeek';

import Colors from '../constants/colors';
import Styles from '../constants/styles';

import Card from '../components/Card';

const styles = StyleSheet.create({
  header: {
    paddingBottom: 15,
    borderBottomColor: Colors.grey2,
    borderBottomWidth: 1.2,
    margin: 20,
    marginBottom: -5,
  },
  body: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  badge: {
    position: 'absolute',
    top: 25,
    right: 20,
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  badgeText: {
    color: Colors.white,
    textTransform: 'uppercase',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  title: {
    paddingBottom: 0,
    fontSize: 22,
  },
  subTitle: {
    fontSize: 15,
    color: Colors.strongGrey,
  },
  text: {
    fontSize: 16,
  },
  horario: {
    flexDirection: 'row',
  },
  textSeparator: {
    paddingLeft: 20,
    color: Colors.strongGrey,
    marginBottom: 10,
    marginTop: 20,
    textTransform: 'uppercase',
    fontSize: 12,
  },
});

const AsignaturaScreen = ({ navigation }) => {
  const { asignatura } = navigation.state.params;

  return (
    <View style={styles.container}>
      {asignatura.estado !== 'Cursando' && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                asignatura.estado === 'Promovido' || asignatura.estado === 'Aprobado'
                  ? Colors.success
                  : Colors.info,
            },
          ]}
        >
          <Text style={styles.badgeText}>{asignatura.estado}</Text>
        </View>
      )}
      <View style={styles.header}>
        <Text style={styles.title}>{asignatura.nombre}</Text>
        <Text style={styles.subTitle}>{`${asignatura.id} - ${asignatura.curso}`}</Text>
      </View>
      <View style={styles.body}>
        <Text
          style={styles.text}
        >{`${asignatura.sede}  -  Aula: ${asignatura.aula}`}</Text>
        <View style={styles.horario}>
          <Icon name="access-time" type={'MaterialIcons'} style={Styles.icon} />
          <Text style={{ color: Colors.strongGrey, paddingLeft: 5 }}>{`${
            WeekDays[asignatura.dia]
          } (${asignatura.turno}) ${asignatura.hora}hs a ${asignatura.horaT}hs `}</Text>
        </View>
      </View>
      <Text style={styles.textSeparator}>Resultado de Parciales</Text>
      <Card message={'No hay notas registradas al día de la fecha.'} />
    </View>
  );
};

AsignaturaScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack()} />,
});

AsignaturaScreen.propTypes = {
  navigation: PropTypes.any,
};

export default AsignaturaScreen;
