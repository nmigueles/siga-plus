import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, StatusBar } from 'react-native';

import Logo from '../components/Logo';
import FormLogin from '../components/FormLogin';

const styles = StyleSheet.create({
  formContainer: { flex: 1, marginBottom: 150 },
  logoContainer: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const LoginScreen = ({ navigation }) => {
  const handleLogin = ({ user, pass }, setLoading, setErrorMessage) => {
    if (user === '' || pass === '') {
      setErrorMessage('Los campos no pueden estar vacios.');
      setLoading(false);
      return;
    }
    setLoading(false);
    navigation.navigate('Home');
  };

  return (
    <>
      <Logo scale={15} style={styles.logoContainer} />
      <View style={styles.formContainer}>
        <FormLogin handleLogin={handleLogin} />
      </View>
    </>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.any,
};

LoginScreen.navigationOptions = {
  headerShown: false,
};

export default LoginScreen;
