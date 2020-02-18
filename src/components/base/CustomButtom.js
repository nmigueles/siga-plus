/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/colors';

const styles = StyleSheet.create({
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
  doneIcon = 'md-checkmark',
  doneBgColor = Colors.success,
  activityIndicatorColor = Colors.white2,
}) => (
  <TouchableOpacity
    disabled={loading || done}
    onPress={onPress}
    style={[styles.button, style, done ? { backgroundColor: doneBgColor } : null]}
  >
    {loading ? (
      <ActivityIndicator size="small" color={activityIndicatorColor} />
    ) : done ? (
      <Ionicons name={doneIcon} color="white" size={20} />
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
  doneIcon: PropTypes.string,
  doneBgColor: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  activityIndicatorColor: PropTypes.string,
};

export default CustomButton;
