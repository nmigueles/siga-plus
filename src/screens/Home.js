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
      <MessageBox
        message={
          'Les informamos que entre los días 18 de Febrero a las 16 hs. y el 5 de Marzo a las 16 hs se desarrollará la Preinscripción a materias del Ciclo lectivo de 2020.'
        }
        type={'info'}
      />
      <AsignaturaDelDia />
    </ScrollView>
  );
};

HomeScreen.navigationOptions = () => ({
  headerTitle: () => <AppLogo size={23} />,
});

export default HomeScreen;
