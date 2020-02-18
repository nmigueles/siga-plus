import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, StatusBar, AsyncStorage } from 'react-native';

import Colors from '../constants/colors';

import AppLogo from '../components/base/AppLogo';
import FormLogin from '../components/login/FormLogin';

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    backgroundColor: Colors.grey,
  },
  formContainer: {
    marginTop: -40,
    marginBottom: 220,
  },
  logoContainer: {
    flex: 1,
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const LoginScreen = ({ navigation }) => {
  StatusBar.setBackgroundColor(Colors.grey);

  const signIn = async () => {
    await AsyncStorage.setItem('userToken', 'test');
    navigation.navigate('App');
  };

  const handleLogin = async ({ user, pass }, setLoading, setErrorMessage, setDone) => {
    if (user === '' || pass === '') {
      setErrorMessage('Los campos no pueden estar vacios.');
      setLoading(false);
      return;
    }

    // Simulate api loading response.
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => {
        signIn();
      }, 800);
    }, 2000);
  };

  return (
    <View style={styles.Main}>
      <View style={styles.logoContainer}>
        <AppLogo size={70} />
      </View>
      <View style={styles.formContainer}>
        <FormLogin handleLogin={handleLogin} />
      </View>
    </View>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.any,
};

LoginScreen.navigationOptions = {
  headerShown: false,
};

export default LoginScreen;
