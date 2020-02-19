import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import asignaturasList from '../constants/asignaturas';

import TextSeparator from '../components/base/TextSeparator';
import WeekHorario from '../components/asignatura/WeekHorario';
import Asignatura from '../components/asignatura/Asignatura';

const style = StyleSheet.create({
  cursadaContainer: {
    flex: 1,
    marginBottom: 40,
  },
});

const getAsignaturas = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return asignaturasList;
};

const CursadaScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [reload, Reload] = useState(1);
  const [asignaturas, setAsignaturas] = useState([]);

  useEffect(() => {
    async function preload() {
      setAsignaturas(await getAsignaturas());
      setLoading(false);
    }
    const listener = navigation.addListener('willFocus', () => {
      Reload(Math.random());
    });

    preload();
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <ScrollView>
      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
      {!loading && (
        <View style={style.cursadaContainer}>
          <TextSeparator title="Cursada actual" />

          {asignaturas.map(asignatura => (
            <Asignatura
              reload={reload}
              key={asignatura.id}
              asignatura={asignatura}
              navigation={navigation}
            />
          ))}
          <TextSeparator title="Semana" />
          <WeekHorario asignaturas={asignaturas} reload={reload} />
        </View>
      )}
    </ScrollView>
  );
};

CursadaScreen.propTypes = {
  navigation: PropTypes.any,
};

export default CursadaScreen;
