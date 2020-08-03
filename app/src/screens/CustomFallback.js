import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, Button } from 'react-native';

const CustomFallback = ({ error, resetError }) => (
  <View>
    <Text>Something happened!</Text>
    <Text>{error.toString()}</Text>
    <Button onPress={resetError} title={'Try again'} />
  </View>
);

CustomFallback.propTypes = {
  error: PropTypes.any,
  resetError: PropTypes.any,
};

export default CustomFallback;
