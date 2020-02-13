import React from 'react';
import { StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Colors from '../constants/colors';
import MessageBox from '../components/MessageBox';
import AsignaturaDelDia from '../components/AsignaturaDelDia';

const HomeScreen = () => {
  StatusBar.setBackgroundColor(Colors.white);

  // const signOut = async () => {
  //   await AsyncStorage.clear();
  //   navigation.navigate('Login');
  // };

  return (
    <ScrollView>
      <MessageBox message="Este es un mensaje de alerta de prueba." type="alert" />
      <AsignaturaDelDia />
    </ScrollView>
  );
};

export default HomeScreen;
