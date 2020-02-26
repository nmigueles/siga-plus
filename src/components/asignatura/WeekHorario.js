import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Row } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import { Week, WeekDays, WeekFuture } from '../../utils/getOrderedWeek';

import Colors from '../../constants/colors';

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

    paddingHorizontal: 20,
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
    color: Colors.main,
    marginBottom: 10,
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
    color: Colors.main,
  },
});

// eslint-disable-next-line no-unused-vars
const WeekHorario = ({ asignaturas }) => (
  <View>
    <ScrollView
      horizontal={true}
      snapToInterval={cardWidth + 20}
      snapToAlignment={'center'}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {Week.map((weekDay, index) => {
        const AsignaturasDelDia = asignaturas.filter(({ dia }) => dia === weekDay);
        if (AsignaturasDelDia.length) {
          return (
            <View style={styles.card} key={Math.random()}>
              <Text style={styles.diaText}>
                {index > 1 ? WeekDays[AsignaturasDelDia[0].dia] : WeekFuture[index]}
              </Text>
              {AsignaturasDelDia.length === 1 && (
                <>
                  <View>
                    <View>
                      <Text numberOfLines={1}>{AsignaturasDelDia[0].nombre}</Text>
                    </View>
                    <Row>
                      <Icon name="md-time" style={styles.iconTime} />
                      <Text>{AsignaturasDelDia[0].hora}</Text>
                    </Row>
                  </View>
                </>
              )}
              {AsignaturasDelDia.length > 1 &&
                AsignaturasDelDia.map((asignatura, i) => (
                  <View key={i}>
                    <Row
                      key={asignatura._id}
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <View style={{ maxWidth: '70%' }}>
                        <Text numberOfLines={1}>{asignatura.nombre}</Text>
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

WeekHorario.propTypes = {
  asignaturas: PropTypes.array.isRequired,
};

export default WeekHorario;
