import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  main: {
    color: Colors.strongGrey,
    paddingLeft: 20,
    marginBottom: 10,
    marginTop: 20,
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 0.5,
  },
});

const TextSeparator = ({ title }) => <Text style={styles.main}>{title}</Text>;
TextSeparator.propTypes = {
  title: PropTypes.string,
};

export default TextSeparator;
