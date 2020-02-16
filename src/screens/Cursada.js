import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import asignaturas from '../constants/asignaturas';

import Horario from '../components/Horario';
import Asignatura from '../components/Asignatura';
import TextSeparator from '../components/TextSeparator';
import MessageBox from '../components/MessageBox';

const style = StyleSheet.create({
  cursadaContainer: {
    flex: 1,
    marginBottom: 40,
  },
});

const CursadaScreen = ({ navigation }) => (
  <ScrollView>
    <MessageBox
      message={
        'Les informamos que entre los días 18 de Febrero a las 16 hs. y el 5 de Marzo a las 16 hs se desarrollará la Preinscripción a materias del Ciclo lectivo de 2020.'
      }
      type={'info'}
    />
    <View style={style.cursadaContainer}>
      <TextSeparator title="Cursada actual" />

      {asignaturas.map(asignatura => (
        <Asignatura key={asignatura.id} asignatura={asignatura} navigation={navigation} />
      ))}
      <TextSeparator title="Semana" />
      <Horario asignaturas={asignaturas} />
    </View>
  </ScrollView>
);

CursadaScreen.propTypes = {
  navigation: PropTypes.any,
};

export default CursadaScreen;
