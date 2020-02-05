import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

const AsignaturaScreen = ({ navigation }) => {
  const nombre = navigation.getParam('nombre', 'Nombre');
  // const notas = navigation.getParam('notas', []);

  return (
    <View>
      <Text>{nombre}</Text>
    </View>
  );
};

AsignaturaScreen.propTypes = {
  navigation: PropTypes.any,
};

export default AsignaturaScreen;
