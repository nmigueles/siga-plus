import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet, StatusBar } from 'react-native';

const logo = require('../img/utn.png');

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    opacity: 0.8,
  },
});

function Logo({ scale }) {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={{ ...styles.logo, transform: [{ scale: scale ? scale * 0.01 : 0.15 }] }}
        source={logo}
      />
    </View>
  );
}

Logo.propTypes = {
  scale: PropTypes.number,
};

export default Logo;
