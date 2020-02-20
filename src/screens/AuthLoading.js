import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { AppLoading } from 'expo';

import AuthService from '../services/authService';

function AuthLoadingScreen({ navigation }) {
  // Fetch the token from storage then navigate to our appropriate place
  const isLogged = async () => {
    const { valid, reason } = await AuthService.checkIfLogged();
    if (!valid && reason) Alert(reason);
    navigation.navigate(valid ? 'App' : 'Login');
  };

  useEffect(() => {
    isLogged();
  }, []);

  return <AppLoading />;
}

AuthLoadingScreen.propTypes = {
  navigation: PropTypes.any,
};

export default AuthLoadingScreen;
