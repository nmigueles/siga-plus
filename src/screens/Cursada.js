import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Card from '../components/base/Card';
import LastUpdated from '../components/base/LastUpdated';
import TextSeparator from '../components/base/TextSeparator';
import WeekHorario from '../components/asignatura/WeekHorario';
import Asignatura from '../components/asignatura/Asignatura';
import CoursesService from '../services/coursesService';

const style = StyleSheet.create({
  cursadaContainer: {
    flex: 1,
    marginBottom: 40,
  },
});

const getAsignaturas = async () => {
  const courses = await CoursesService.getCourses();
  return courses;
};

const CursadaScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [reload, Reload] = useState(1);
  const [asignaturas, setAsignaturas] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAsignaturas().then(response => {
      setAsignaturas(response);
      setRefreshing(false);
    });
  }, [refreshing]);

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
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {loading && <ActivityIndicator style={{ marginTop: 40 }} />}
      {!loading && (
        <View style={style.cursadaContainer}>
          <TextSeparator title="Cursada actual">
            <LastUpdated />
          </TextSeparator>
          {asignaturas.length === 0 && <Card message="No hay cursos." />}
          {asignaturas.length > 0 &&
            asignaturas.map(asignatura => (
              <Asignatura
                key={asignatura._id}
                asignatura={asignatura}
                navigation={navigation}
                reload={reload}
              />
            ))}
          {asignaturas.length > 0 && (
            <View>
              <TextSeparator title="Semana" />
              <WeekHorario asignaturas={asignaturas} />
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

CursadaScreen.propTypes = {
  navigation: PropTypes.any,
};

export default CursadaScreen;
