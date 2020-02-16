import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const Dot = ({ style, color = '#fff', size = 10 }) => (
  <View
    style={[
      {
        marginHorizontal: 0.7,
        width: size,
        height: size,
        borderRadius: size / 2,
      },
      { backgroundColor: color },
      style,
    ]}
  />
);

Dot.propTypes = {
  color: PropTypes.string,
  style: PropTypes.any,
  size: PropTypes.number,
};

export default Dot;
