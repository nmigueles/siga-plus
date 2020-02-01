import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';

import Colors from '../constants/colors';

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
  loading = false,
}) => (
  <TouchableOpacity disabled={loading} onPress={onPress} style={[styles.button, style]}>
    {loading ? (
      <ActivityIndicator size="small" color={Colors.white2} />
    ) : (
      <Text style={[styles.text, textStyle]}>{title}</Text>
    )}
  </TouchableOpacity>
);

CustomButton.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  textStyle: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default CustomButton;
