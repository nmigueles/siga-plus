import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';

import Dia from './Dia';

import Colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white2,
  },
  turnoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
  },
  turnoText: {
    color: Colors.black,
    textTransform: 'uppercase',
    fontSize: 10,
    textAlign: 'center',
    width: 80,
  },
});

const Semana = [
  {
    dia: 'Lunes',
    color: '#ffcc00',
    horas: {
      mañana: [0, 0, 0, 1, 1, 1, 0],
      tarde: [0, 0, 0, 0, 0, 0, 0],
      noche: [0, 0, 0, 0, 0, 0, 0],
    },
  },
  {
    dia: 'Martes',
    horas: {
      mañana: [0, 0, 0, 0, 0, 0, 0],
      tarde: [0, 0, 0, 0, 0, 0, 0],
      noche: [0, 0, 0, 0, 0, 0, 0],
    },
  },
  {
    dia: 'Miercoles',
    horas: {
      mañana: [0, 0, 0, 0, 0, 0, 0],
      tarde: [0, 0, 0, 0, 0, 0, 0],
      noche: [0, 0, 0, 0, 0, 0, 0],
    },
  },
  {
    dia: 'Jueves',
    color: '#ff6666',
    horas: {
      mañana: [0, 0, 0, 0, 0, 0, 0],
      tarde: [0, 1, 1, 1, 1, 0, 0],
      noche: [0, 0, 0, 0, 0, 0, 0],
    },
  },
  {
    dia: 'Viernes',
    color: '#66cccc',
    horas: {
      mañana: [0, 0, 0, 0, 0, 0, 0],
      tarde: [0, 0, 0, 0, 0, 0, 0],
      noche: [0, 0, 1, 1, 0, 0, 0],
    },
  },
  {
    dia: 'Sabado',
    horas: {
      mañana: [0, 0, 0, 0, 0, 0, 0],
      tarde: [0, 0, 0, 0, 0, 0, 0],
      noche: [0, 0, 0, 0, 0, 0, 0],
    },
  },
];

// eslint-disable-next-line no-unused-vars
const Horarios = ({ asignaturas }) => (
  <View style={styles.container}>
    <View style={styles.turnoContainer}>
      <View>
        <Text style={[styles.turnoText, { width: 55, marginRight: 10 }]}></Text>
      </View>
      <View>
        <Text style={styles.turnoText}>Mañana</Text>
      </View>
      <View>
        <Text style={styles.turnoText}>Tarde</Text>
      </View>
      <View>
        <Text style={styles.turnoText}>Noche</Text>
      </View>
    </View>
    {Semana.map(({ dia, color, horas }) => (
      <Dia key={dia} nombre={dia} color={color} horas={horas} />
    ))}
  </View>
);

Horarios.displayName = 'Horarios';
Horarios.propTypes = {
  asignaturas: PropTypes.array.isRequired,
};

export default Horarios;
