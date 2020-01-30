import React from 'react';
import { StyleSheet, View, Image, StatusBar } from 'react-native';
import FormLogin from '../components/FormLogin';

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    transform: [{ scale: 0.13 }],
    opacity: 0.8,
  },
  formContainer: { flex: 1, marginBottom: 150 },
});

const LoginScreen = () => {
  StatusBar.setBackgroundColor('red');
  return (
    <>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../img/utn.png')} />
      </View>
      <View style={styles.formContainer}>
        <FormLogin />
      </View>
    </>
  );
};

LoginScreen.navigationOptions = {
  headerShown: false,
};

export default LoginScreen;
