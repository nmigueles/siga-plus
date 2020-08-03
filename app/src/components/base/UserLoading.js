import React, { useEffect, useState } from 'react';
import { Animated, Easing, View, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
    marginBottom: 10,
  },
  userNameLoading: {
    width: '60%',
    height: 15,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 7,
  },
  userCarreraLoading: {
    width: '90%',
    height: 10,
    borderRadius: 5,
    marginBottom: 2,
  },
  loading: {
    backgroundColor: Colors.strongGrey,
  },
});

const UserLoading = () => {
  const [opacity] = useState(new Animated.Value(1));
  Animated.loop(
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0.1,
        duration: 800,
        ease: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 800,
        ease: Easing.ease,
        useNativeDriver: true,
      }),
    ])
  ).start();

  return (
    <Animated.View style={{ opacity }}>
      <View style={[styles.userImage, styles.loading]} />
      <View style={[styles.userNameLoading, styles.loading]}></View>
      <View style={[styles.userCarreraLoading, styles.loading]}></View>
    </Animated.View>
  );
};

export default UserLoading;
