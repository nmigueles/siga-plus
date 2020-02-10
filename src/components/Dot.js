import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const styles = StyleSheet.create({
  dot: {
    marginHorizontal: 0.7,
  },
});

const Dot = ({ extraStyle = {}, state = true, color = '#fff', size = 10 }) => (
  <View
    style={[
      styles.dot,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
      },
      state ? { backgroundColor: color } : { backgroundColor: Colors.grey2 },
      extraStyle,
    ]}
  />
);

Dot.propTypes = {
  color: PropTypes.string,
  extraStyle: PropTypes.object,
  size: PropTypes.number,
  state: PropTypes.bool,
};

export default Dot;
