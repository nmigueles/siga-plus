import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0,0,0,0.78)',
  },

  text: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
});

export const CustomButton = props => {
  const { title = 'Enter', style = {}, textStyle = {}, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
