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
  const logout = navigation.getParam('logout', false);
  console.log(logout);

  const cleanForm = cleanInputs => {
    cleanInputs();
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
        navigation.navigate('Home');
        setDone(false);
      }, 800);
    }, 2000);
  };

  return (
    <>
      <Logo scale={15} style={styles.logoContainer} />
      <View style={styles.formContainer}>
        <FormLogin cleanForm={cleanForm} handleLogin={handleLogin} />
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
