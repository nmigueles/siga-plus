import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/colors';

const height = 60;
const dotSize = 15;

const styles = StyleSheet.create({
  container: {
    height,
    backgroundColor: Colors.white2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
  },
  dot: {
    position: 'absolute',
    right: 25,
    borderRadius: dotSize / 2,
    top: height / 2 - dotSize / 2,
    height: dotSize,
    width: dotSize,
  },
  nameText: {
    paddingLeft: 20,
  },
});

const Asignatura = ({ navigation, nombre, color, notas }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => {
      navigation.navigate('Asignatura', { nombre, notas });
    }}
  >
    <Text style={styles.nameText}>{nombre}</Text>
    <View style={[styles.dot, { backgroundColor: color }]} />
  </TouchableOpacity>
);

Asignatura.propTypes = {
  navigation: PropTypes.any,
  color: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  notas: PropTypes.array.isRequired,
};

Asignatura.displayName = 'Asignatura';

export default Asignatura;
