import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';

const logo = require('../../img/utn.png');

const styles = StyleSheet.create({
  logo: {
    opacity: 0.8,
  },
});

const Logo = ({ scale, style }) => (
  <View style={style}>
    <Image
      style={{ ...styles.logo, transform: [{ scale: scale ? scale * 0.01 : 0.15 }] }}
      source={logo}
    />
  </View>
);

Logo.displayName = 'Logo';
Logo.propTypes = {
  scale: PropTypes.number,
  style: PropTypes.object,
};

export default Logo;
