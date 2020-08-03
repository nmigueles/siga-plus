import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  main: {
    color: Colors.strongGrey,
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  row: {
    paddingLeft: 20,
    marginBottom: 10,
    marginTop: 20,
    flexDirection: 'row',
  },
});

const TextSeparator = ({ title, children }) => (
  <View style={styles.row}>
    <Text style={styles.main}>{title}</Text>
    {children}
  </View>
);
TextSeparator.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default TextSeparator;
