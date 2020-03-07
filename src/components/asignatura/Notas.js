import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Styles from '../../constants/styles';

const styles = StyleSheet.create({
  textCalificacion: {
    fontSize: 25,
  },
  subText: {
    fontSize: 15,
  },
  row: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const Notas = ({ notas }) => {
  const getFullNameInstancia = instancia => {
    if (instancia === 'PP') return 'Primer Parcial';
    if (instancia === 'SP') return 'Segundo Parcial';
    return 'Instancia invalida';
  };
  return notas.map(nota => (
    <View key={nota.instancia} style={[Styles.card, styles.row]}>
      <Text style={[styles.subText]}>{getFullNameInstancia(nota.instancia)}</Text>
      <Text style={[styles.textCalificacion]}>{nota.calificacion}</Text>
    </View>
  ));
};
Notas.propTypes = {
  notas: PropTypes.array.isRequired,
};

export default Notas;
