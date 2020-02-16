import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';

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
        borderBottomColor: Colors.grey2,
        borderBottomWidth: 1,
        marginBottom: 10,
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
        padding: 20,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {colors.map(col => (
        <TouchableOpacity key={Math.random()} onPress={() => setColor(col)}>
          <View
            style={{
              backgroundColor: col,
              height: 50,
              width: 50,
              borderRadius: 25,
              alignSelf: 'baseline',
              marginVertical: 5,
              marginRight: 5,
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
