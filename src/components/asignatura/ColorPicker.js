import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../../constants/colors';

const colors = [
  '#957DAD',
  '#D291BC',
  '#E0BBE4',
  '#FEC8D8',
  Colors.error,
  Colors.alert,
  Colors.info,
  Colors.green,
  Colors.teal,
  Colors.strongGrey,
];

const ColorPicker = ({ setColor }) => (
  <View>
    <Text
      style={{
        fontSize: 20,
        marginTop: 20,
        paddingBottom: 10,
        marginHorizontal: 20,
      }}
    >
      Seleccionar color
    </Text>
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 18.5,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {colors.map(col => (
        <TouchableOpacity key={Math.random()} onPress={() => setColor(col)}>
          <View
            style={{
              backgroundColor: col,
              height: 45,
              width: 45,
              borderRadius: 22.5,
              alignSelf: 'baseline',
              marginVertical: 5,
              marginHorizontal: 2.5,
            }}
          ></View>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

ColorPicker.propTypes = {
  setColor: PropTypes.any,
};

export default ColorPicker;
