// @ts-check
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppLoading } from 'expo';

import AuthService from '../services/authService';

function AuthLoadingScreen({ navigation }) {
  // Fetch the token from storage then navigate to our appropriate place
  const isLogged = async () => {
    const valid = await AuthService.userValidLogin();
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
