import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 8,
  },
  outbar: {
    flex: 1,
    backgroundColor: Colors.grey2,
    borderRadius: 20,
    overflow: 'hidden',
  },
  bar: {
    flex: 1,
    backgroundColor: Colors.green2,
  },
});

const Notas = ({ progress = 50 }) => (
  <View style={styles.container}>
    <View style={styles.outbar}>
      <View style={[styles.bar, { width: `${progress}%` }]}></View>
    </View>
  </View>
);

Notas.propTypes = {
  progress: PropTypes.number,
};

export default Notas;
