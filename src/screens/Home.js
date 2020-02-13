import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Colors from '../constants/colors';
import MessageBox from '../components/MessageBox';
import LogoutButton from '../components/CustomButtom';
import AsignaturaDelDia from '../components/AsignaturaDelDia';

const HomeScreen = ({ navigation }) => {
  StatusBar.setBackgroundColor(Colors.white);

  const signOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <ScrollView>
      <MessageBox message="Este es un mensaje de alerta de prueba." type="alert" />
      <AsignaturaDelDia />
      <LogoutButton
        title="Cerrar sesión"
        onPress={signOut}
        style={{ marginHorizontal: 20, marginTop: 200 }}
      />
    </ScrollView>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.any,
};

export default HomeScreen;
