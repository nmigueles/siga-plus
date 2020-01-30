import React from 'react';
import { StyleSheet, View } from 'react-native';
import FormLogin from '../components/FormLogin';
import Logo from '../components/Logo';

const styles = StyleSheet.create({
  formContainer: { flex: 1, marginBottom: 150 },
});

const LoginScreen = ({ navigation }) => {
  return (
    <>
      <Logo scale={15} />
      <View style={styles.formContainer}>
        <FormLogin onPress={() => navigation.navigate('Home')} />
      </View>
    </>
  );
};

LoginScreen.navigationOptions = {
  headerShown: false,
};

export default LoginScreen;
