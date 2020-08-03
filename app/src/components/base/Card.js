import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

import Styles from '../../constants/styles';

const Card = ({ nombre = '', message = '', icon = 'error' }) => (
  <View
    style={[
      Styles.card,
      {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
    ]}
  >
    <Icon
      name={icon}
      type={'MaterialIcons'}
      style={[Styles.icon, { marginHorizontal: 5 }]}
    />
    <Text style={Styles.errorGrey}>{`${message} ${nombre}`}</Text>
  </View>
);

Card.propTypes = {
  id: PropTypes.any,
  nombre: PropTypes.string,
  message: PropTypes.string,
  icon: PropTypes.string,
};

export default Card;
