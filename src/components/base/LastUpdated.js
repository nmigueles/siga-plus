/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import TimeAgo from 'react-native-timeago';

import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: { position: 'absolute', right: 10, bottom: 1, opacity: 0.6 },
  text: { color: Colors.strongGrey, fontSize: 10 },
});

const LastUpdated = ({ last }) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      última actualización <TimeAgo style={styles.text} time={last} />.
    </Text>
  </View>
);

LastUpdated.propTypes = {
  last: PropTypes.any,
};

export default LastUpdated;
