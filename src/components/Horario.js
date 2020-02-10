import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, Row } from 'native-base';

import Dot from './Dot';
import Colors from '../constants/colors';
import { Week, WeekDays, WeekFuture } from '../functions/getOrderedWeek';

const { width } = Dimensions.get('screen');
const cardWidth = width * 0.6;
const cardHeigth = 100;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  card: {
    height: cardHeigth,
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
    marginRight: 5,
  },
  linearGradient: {
    position: 'absolute',
    width: cardWidth * 0.4,
    top: 0,
    right: 0,
    height: cardHeigth,
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
    ></LinearGradient>
    <ScrollView
      horizontal={true}
      snapToInterval={cardWidth}
      snapToAlignment={'start'}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {Week.map((weekDay, index) => {
        const a = asignaturas.find(({ dia }) => dia === weekDay);
        if (a) {
          return (
            <View style={styles.card} key={a.id}>
              <Dot color={a.color} size={12} extraStyle={styles.dot} />
              <Text style={styles.diaText}>
                {index > 1 ? WeekDays[a.dia] : WeekFuture[index]}
              </Text>
              <View>
                <Text>{a.nombre}</Text>
              </View>
              <Row>
                <Icon name="md-time" style={styles.iconTime} />
                <Text>{a.hora}</Text>
              </Row>
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
