import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Colors from '../constants/colors';
import asignaturas from '../constants/asignaturas';

import Horario from '../components/Horario';
import MessageBox from '../components/MessageBox';
import Asignatura from '../components/Asignatura';

const style = StyleSheet.create({
  text: {
    color: Colors.strongGrey,
    paddingLeft: 20,
    marginBottom: 10,
    marginTop: 20,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  cursadaContainer: {
    flex: 1,
    marginTop: 20,
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
      <Text style={style.text}>Cursada actual</Text>
      {asignaturas.map(a => (
        <Asignatura
          key={a.id}
          nombre={a.nombre}
          color={a.color}
          notas={a.notas}
          navigation={navigation}
        />
      ))}
      <Text style={style.text}>Semana</Text>
      <Horario asignaturas={asignaturas} />
      {/* <Horarios asignaturas={asignaturas} /> */}
    </View>
  </ScrollView>
);

CursadaScreen.propTypes = {
  navigation: PropTypes.any,
};

export default CursadaScreen;
