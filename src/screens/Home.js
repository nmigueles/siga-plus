import React from 'react';
import { StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Colors from '../constants/colors';

import AppLogo from '../components/base/AppLogo';
import MessageBox from '../components/base/MessageBox';
import AsignaturaDelDia from '../components/asignatura/AsignaturaDelDia';

const HomeScreen = () => {
  StatusBar.setBackgroundColor(Colors.white);

  return (
    <ScrollView>
      <MessageBox message={'Cuarentena, clases virtuales.'} type={'alert'} />
      <AsignaturaDelDia />
    </ScrollView>
  );
};

HomeScreen.navigationOptions = () => ({
  headerTitle: () => <AppLogo size={23} />,
});

export default HomeScreen;
