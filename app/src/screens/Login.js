import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, StatusBar } from 'react-native';

import Colors from '../constants/colors';

import AppLogo from '../components/base/AppLogo';
import FormLogin from '../components/login/FormLogin';
import AuthService from '../services/authService';

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

  const saveAndRedirect = async token => {
    await AuthService.setUserToken(token);
    navigation.navigate('App');
  };

  const handleLogin = async ({ user, pass }, setLoading, setErrorMessage, setDone) => {
    if (user === '' || pass === '') {
      setErrorMessage('Los campos no pueden estar vacios.');
      setLoading(false);
      return;
    }

    const { success, token, message } = await AuthService.login(user, pass);
    setLoading(false);

    if (success) {
      // logear usuario
      if (token) {
        setDone(true);
        setTimeout(() => {
          saveAndRedirect(token);
        }, 800);
      } else {
        setErrorMessage('Error obteniendo el token.');
      }
    } else if (message) {
      setErrorMessage(message);
    }
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
