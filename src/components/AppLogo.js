import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: Colors.main,
  },
});

const AppLogo = ({ style, size = 30 }) => (
  <View style={styles.container}>
    <Text style={[styles.title, { fontSize: size }, style]}>SIGA</Text>
    <View style={[styles.plus, { paddingBottom: size * 0.1 }]}>
      <Text style={[styles.title, { fontSize: size + 5 }, style]}>+</Text>
    </View>
  </View>
);

AppLogo.propTypes = {
  style: PropTypes.any,
  size: PropTypes.number,
};

export default AppLogo;
