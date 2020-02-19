import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import RBSheet from 'react-native-raw-bottom-sheet';
import { HeaderBackButton } from 'react-navigation-stack';

import { WeekDays } from '../utils/getOrderedWeek';

import Colors from '../constants/colors';

import Card from '../components/base/Card';
import TextSeparator from '../components/base/TextSeparator';
import ColorPicker from '../components/asignatura/ColorPicker';
import ColorService from '../services/colorService';

const styles = StyleSheet.create({
  header: {
    paddingBottom: 15,
    margin: 20,
    marginBottom: 0,
  },
  body: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  badge: {
    padding: 10,
    marginLeft: 20,
    borderRadius: 5,
    maxWidth: 100,
    zIndex: 10,
  },
  badgeText: {
    color: Colors.white,
    textTransform: 'uppercase',
    fontSize: 10,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  title: {
    paddingBottom: 0,
    fontSize: 25,
    color: Colors.main,
  },
  subTitle: {
    fontSize: 16,
    color: Colors.strongGrey,
  },
  text: {
    color: Colors.main,
    fontSize: 18,
  },
  horario: {
    flexDirection: 'row',
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    zIndex: 5,
    top: 0.8,
    marginRight: 10,
  },
  bodySubtitle: {
    color: Colors.main,
    paddingLeft: 5,
    fontSize: 16,
  },
  timeIcon: {
    color: Colors.main,
    fontSize: 14,
    top: 4,
  },
});

const AsignaturaScreen = ({ navigation }) => {
  const { asignatura } = navigation.state.params;
  const refRBSheet = useRef();
  const [color, setColor] = useState(asignatura.color);

  useEffect(() => {
    const getColor = async () => {
      const storedColor = await ColorService.getColor(asignatura.id);
      if (storedColor !== null) setColor(storedColor);
    };
    getColor();
  }, []);

  useEffect(() => {
    const saveColor = async () => {
      await ColorService.saveColor(asignatura.id, color);
    };
    saveColor();
  }, [color]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{asignatura.nombre}</Text>
        <View style={styles.subtitleContainer}>
          <TouchableOpacity
            style={[styles.dot, { backgroundColor: color }]}
            onPress={() => refRBSheet.current.open()}
          />
          <Text style={styles.subTitle}>{`${asignatura.id} - ${asignatura.curso}`}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text
          style={styles.text}
        >{`${asignatura.sede}  -  Aula: ${asignatura.aula}`}</Text>
        <View style={styles.horario}>
          <Icon name="access-time" type={'MaterialIcons'} style={styles.timeIcon} />
          <Text style={styles.bodySubtitle}>{`${WeekDays[asignatura.dia]} (${
            asignatura.turno
          }) ${asignatura.hora}hs a ${asignatura.horaT}hs `}</Text>
        </View>
      </View>

      {asignatura.estado !== 'Cursando' && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                asignatura.estado === 'Promovido' || asignatura.estado === 'Aprobado'
                  ? Colors.success
                  : Colors.info,
            },
          ]}
        >
          <Text style={styles.badgeText}>{asignatura.estado}</Text>
        </View>
      )}
      <TextSeparator title="Resultado de Parciales" />
      <Card message={'No hay notas registradas al día de la fecha.'} />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            backgroundColor: Colors.white2,
            borderTopEndRadius: 25,
            borderTopStartRadius: 25,
            shadowColor: Colors.main,
            shadowOffset: 2,
            elevation: 50,
          },
          draggableIcon: {
            backgroundColor: Colors.strongGrey,
          },
        }}
      >
        <ColorPicker asignatura={asignatura} setColor={setColor} />
      </RBSheet>
    </View>
  );
};

AsignaturaScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack()} />,
});

AsignaturaScreen.propTypes = {
  navigation: PropTypes.any,
};

export default AsignaturaScreen;
