/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  done: {
    backgroundColor: Colors.success,
  },
  button: {
    display: 'flex',
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.main,
  },

  text: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
});

const CustomButton = ({
  title = 'Enter',
  style = {},
  textStyle = {},
  onPress,
  done = false,
  loading = false,
}) => (
  <TouchableOpacity
    disabled={loading || done}
    onPress={onPress}
    style={[styles.button, style, done ? styles.done : null]}
  >
    {loading ? (
      <ActivityIndicator size="small" color={Colors.white2} />
    ) : done ? (
      <Ionicons name="md-checkmark" color="white" size={20} />
    ) : (
      <Text style={[styles.text, textStyle]}>{title}</Text>
    )}
  </TouchableOpacity>
);

CustomButton.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  textStyle: PropTypes.object,
  loading: PropTypes.bool,
  done: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

export default CustomButton;
