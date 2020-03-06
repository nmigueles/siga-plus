import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';

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
  icon: {
    position: 'absolute',
    top: 13,
    left: 10,
    zIndex: 3,
    color: Colors.white2,
  },
});

const ColorPicker = ({ onColorClick, selected }) => (
  <View>
    <Text style={styles.MainText}>Seleccionar color</Text>
    <View style={styles.ColorsContainer}>
      {colors.map(col => {
        const isSelected = selected === col;
        return isSelected ? (
          <TouchableOpacity key={col}>
            <View
              style={[
                styles.ColorDot,
                {
                  backgroundColor: col,
                  borderColor: `${col}90`,
                  borderWidth: 3,
                },
              ]}
            ></View>
            <Icon name="check" type="MaterialIcons" style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity key={col} onPress={() => onColorClick(col)}>
            <View style={[styles.ColorDot, { backgroundColor: col }]}></View>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

ColorPicker.propTypes = {
  onColorClick: PropTypes.any,
  selected: PropTypes.string,
};

export default ColorPicker;
