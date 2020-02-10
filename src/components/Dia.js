import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';

import Colors from '../constants/colors';
import Dot from './Dot';

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: Colors.white2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  dia: {
    color: Colors.black,
    textTransform: 'uppercase',
    textAlign: 'right',
    fontSize: 10,
    width: 55,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
  },
});

const Dia = ({ nombre, color, horas }) => (
  <View style={styles.container}>
    <Text style={styles.dia}>{nombre}</Text>
    <View style={[styles.row]}>
      {horas.mañana.map(state => (
        <Dot key={Math.random()} state={Boolean(state)} color={color} />
      ))}
    </View>
    <View style={styles.row}>
      {horas.tarde.map(state => (
        <Dot key={Math.random()} state={Boolean(state)} color={color} />
      ))}
    </View>
    <View style={styles.row}>
      {horas.noche.map(state => (
        <Dot key={Math.random()} state={Boolean(state)} color={color} />
      ))}
    </View>
  </View>
);

Dia.displayName = 'Horarios';
Dia.propTypes = {
  color: PropTypes.string,
  horas: PropTypes.object,
  nombre: PropTypes.string.isRequired,
};

export default Dia;
