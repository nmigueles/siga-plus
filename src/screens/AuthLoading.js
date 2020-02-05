import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';

function AuthLoadingScreen({ navigation }) {
  // Fetch the token from storage then navigate to our appropriate place
  const isLogged = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    navigation.navigate(userToken ? 'App' : 'Login');
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
