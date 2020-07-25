import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import getAsignaturasDelDia from '../../utils/getAsignaturasDelDia';
import getEstadoDeAsignatura from '../../helpers/getEstadoDeAsignatura';

import Colors from '../../constants/colors';

import Card from '../base/Card';
import TextSeparator from '../base/TextSeparator';

import CardAsignatura from './CardAsignatura';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
  },
  text: {
    color: Colors.strongGrey,
    paddingLeft: 20,
    marginBottom: 10,
    marginTop: 20,
    textTransform: 'uppercase',
    fontSize: 12,
  },
});

const AsignaturaDelDia = () => {
  const [loading, setLoading] = useState(true);
  const [asignaturas, setAsignaturas] = useState([]);

  useEffect(() => {
    async function preload() {
      setAsignaturas(await getAsignaturasDelDia());
      setLoading(false);
    }
    preload();

    const interval = setInterval(async () => {
      await preload();
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <TextSeparator title="Hoy" />

      {loading && <ActivityIndicator />}

      {!loading && !asignaturas.length && (
        <Card message={'No hay ninguna asignatura hoy.'} icon="terrain" />
      )}
      {!loading &&
        asignaturas.map(asignatura => {
          try {
            const { state, hora } = getEstadoDeAsignatura(
              new Date(),
              asignatura.hora[0],
              asignatura.horaT[0]
            );
            return (
              <CardAsignatura
                key={asignatura._id}
                asignatura={asignatura}
                // TODO TESTEAR SI EL NUEVO FORMATO DE HORA FUNCIONA CON EL TIME AGO
                hora={hora}
                state={state}
              />
            );
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log('Error cargando materia del dia: ', error);
            return (
              <Card
                key={asignatura._id}
                message={'Error cargando la asignatura.'}
                nombre={asignatura.nombre}
              />
            );
          }
        })}
    </View>
  );
};

export default AsignaturaDelDia;
