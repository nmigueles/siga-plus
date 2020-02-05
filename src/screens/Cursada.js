import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Colors from '../constants/colors';
import asignaturas from '../constants/asignaturas';

import Asignatura from '../components/Asignatura';
import Horarios from '../components/Horarios';

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
      <Text style={style.text}>Horarios</Text>
      <Horarios asignaturas={asignaturas} />
    </View>
  </ScrollView>
);

CursadaScreen.propTypes = {
  navigation: PropTypes.any,
};

export default CursadaScreen;
