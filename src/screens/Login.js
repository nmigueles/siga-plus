import React from 'react';
import { StyleSheet, View } from 'react-native';
import FormLogin from '../components/FormLogin';
import Logo from '../components/Logo';

const styles = StyleSheet.create({
  formContainer: { flex: 1, marginBottom: 150 },
});

const LoginScreen = () => {
  const handleLogin = ({ user, pass }, setLoading, setErrorMessage) => {
    // eslint-disable-next-line no-console
    console.log({ user, pass });
    setLoading(false);
    setErrorMessage('Logeado');
  };

  return (
    <>
      <Logo scale={15} />
      <View style={styles.formContainer}>
        <FormLogin handleLogin={handleLogin} />
      </View>
    </>
  );
};

LoginScreen.navigationOptions = {
  headerShown: false,
};

export default LoginScreen;
