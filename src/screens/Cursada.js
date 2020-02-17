import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import asignaturas from '../constants/asignaturas';

import WeekHorario from '../components/WeekHorario';
import Asignatura from '../components/Asignatura';
import TextSeparator from '../components/TextSeparator';

const style = StyleSheet.create({
  cursadaContainer: {
    flex: 1,
    marginBottom: 40,
  },
});

const CursadaScreen = ({ navigation }) => (
  <ScrollView>
    <View style={style.cursadaContainer}>
      <TextSeparator title="Cursada actual" />

      {asignaturas.map(asignatura => (
        <Asignatura key={asignatura.id} asignatura={asignatura} navigation={navigation} />
      ))}
      <TextSeparator title="Semana" />
      <WeekHorario asignaturas={asignaturas} />
    </View>
  </ScrollView>
);

CursadaScreen.propTypes = {
  navigation: PropTypes.any,
};

export default CursadaScreen;
