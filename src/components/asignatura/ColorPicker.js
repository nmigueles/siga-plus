import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../../constants/colors';

const colors = [
  Colors.violeta,
  Colors.rosado,
  Colors.lila,
  Colors.rosa,
  Colors.error,
  Colors.alert,
  Colors.info,
  Colors.green,
  Colors.teal,
  Colors.grey2,
  Colors.strongGrey,
  Colors.main,
];

const circleW = 45;

const styles = StyleSheet.create({
  MainText: {
    fontSize: 20,
    marginVertical: 20,
    paddingBottom: 10,
    marginHorizontal: 20,
  },
  ColorsContainer: {
    flexDirection: 'row',
    marginHorizontal: 18.5,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ColorDot: {
    height: circleW,
    width: circleW,
    borderRadius: circleW / 2,
    marginVertical: 5,
    marginHorizontal: 2.5,
  },
});

const ColorPicker = ({ onColorClick }) => (
  <View>
    <Text style={styles.MainText}>Seleccionar color</Text>
    <View style={styles.ColorsContainer}>
      {colors.map(col => (
        <TouchableOpacity key={col} onPress={() => onColorClick(col)}>
          <View style={[styles.ColorDot, { backgroundColor: col }]}></View>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

ColorPicker.propTypes = {
  onColorClick: PropTypes.any,
};

export default ColorPicker;
