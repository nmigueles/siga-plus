import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, Row } from 'native-base';

import { Week, WeekDays, WeekFuture } from '../utils/getOrderedWeek';

import Dot from './Dot';

import Colors from '../constants/colors';

const { width } = Dimensions.get('screen');
const cardWidth = width * 0.6;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  card: {
    width: cardWidth,
    marginLeft: 20,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: Colors.white2,
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 2.22,
    borderRadius: 5,
  },
  lastCardSpace: {
    width: width - cardWidth - 40,
    backgroundColor: Colors.white2,
    opacity: 0.6,
    marginLeft: 20,
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 2.22,
    borderRadius: 5,
  },
  diaText: {
    fontSize: 25,
  },
  dot: {
    position: 'absolute',
    right: 20,
    top: 22,
  },
  iconTime: {
    fontSize: 15,
    padding: 2.75,
    paddingLeft: 1,
  },
  linearGradient: {
    height: '100%',
    position: 'absolute',
    width: cardWidth * 0.4,
    top: 0,
    right: 0,
    zIndex: 10,
  },
});

// eslint-disable-next-line no-unused-vars
const Horarios = ({ asignaturas }) => (
  <View>
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={['#ffffff00', Colors.white2]}
      style={styles.linearGradient}
    />
    <ScrollView
      horizontal={true}
      snapToInterval={cardWidth}
      snapToAlignment={'start'}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {Week.map((weekDay, index) => {
        const AsignaturasDelDia = asignaturas.filter(({ dia }) => dia === weekDay);
        if (AsignaturasDelDia.length) {
          return (
            <View style={styles.card} key={Math.random()}>
              {AsignaturasDelDia.map((a, i) => (
                <Dot
                  key={a.id}
                  color={a.color}
                  size={12}
                  style={[styles.dot, { right: 20 + 20 * i }]}
                />
              ))}
              <Text style={styles.diaText}>
                {index > 1 ? WeekDays[AsignaturasDelDia[0].dia] : WeekFuture[index]}
              </Text>
              {AsignaturasDelDia.length === 1 && (
                <>
                  <Dot color={AsignaturasDelDia[0].color} size={12} style={styles.dot} />
                  <View
                    style={{
                      paddingVertical: 10,
                    }}
                  >
                    <View>
                      <Text>{AsignaturasDelDia[0].nombre}</Text>
                    </View>
                    <Row>
                      <Icon name="md-time" style={styles.iconTime} />
                      <Text>{AsignaturasDelDia[0].hora}</Text>
                    </Row>
                  </View>
                </>
              )}
              {AsignaturasDelDia.length > 1 &&
                AsignaturasDelDia.map((asignatura, i, array) => (
                  <View key={i}>
                    <Row
                      key={asignatura.id}
                      style={{
                        justifyContent: 'space-between',
                        borderBottomWidth: i === array.length - 1 ? 0 : 1,
                        borderBottomColor: Colors.grey2,
                        alignItems: 'center',
                        paddingTop: 5,
                        paddingBottom: 10,
                        marginTop: 5,
                      }}
                    >
                      <View style={{ maxWidth: '70%' }}>
                        <Text>{asignatura.nombre}</Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Icon name="md-time" style={styles.iconTime} />
                        <Text>{asignatura.hora}</Text>
                      </View>
                    </Row>
                  </View>
                ))}
            </View>
          );
        }
        return null;
      })}
      {/* Fill the space in the last card */}
      <View style={styles.lastCardSpace} />
    </ScrollView>
  </View>
);

Horarios.propTypes = {
  asignaturas: PropTypes.array.isRequired,
};

export default Horarios;
