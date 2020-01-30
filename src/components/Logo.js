import React from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';

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

export default function Logo(props) {
  const scale = props.scale * 0.01 || 0.15;
  return (
    <View style={styles.logoContainer}>
      <Image
        style={{ ...styles.logo, transform: [{ scale: scale }] }}
        source={require('../img/utn.png')}
      />
    </View>
  );
}
