import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

import Colors from '../constants/colors';

const { width, height } = Dimensions.get('window');

const widthBox = width * 0.9;
const widthGap = width * 0.05;

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    opacity: 0.6,
    overflow: 'hidden',
    shadowOpacity: 0.2,
    shadowRadius: 2.22,
  },
  containerOptional: {
    width: widthBox,
    paddingHorizontal: widthGap,
    paddingVertical: widthGap / 2,
    marginHorizontal: widthGap,
    marginTop: widthGap,
  },
  bar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 5,
    height,
  },
});

const MessageBox = ({ type, style, message, opacity }) => (
  <View
    style={[
      styles.container,
      {
        backgroundColor: Colors[type],
        visible: false,
        opacity: opacity === 0 ? 0 : 0.6,
      },
      style || styles.containerOptional,
    ]}
  >
    <View style={[styles.bar, { backgroundColor: Colors.bar, opacity }]}></View>
    <Text style={{ color: Colors.main, opacity }}>{message}</Text>
  </View>
);
MessageBox.propTypes = {
  message: PropTypes.string.isRequired,
  opacity: PropTypes.number,
  style: PropTypes.any,
  type: PropTypes.oneOf(['info', 'error', 'success', 'alert']),
};

export default MessageBox;
