import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { HeaderBackButton } from 'react-navigation-stack';

const AsignaturaScreen = ({ navigation }) => {
  const nombre = navigation.getParam('nombre', 'Nombre');

  // const notas = navigation.getParam('notas', []);

  return (
    <View>
      <Text>{nombre}</Text>
    </View>
  );
};

AsignaturaScreen.navigationOptions = ({ navigation }) => ({
  title: 'Home',
  // eslint-disable-next-line react/display-name
  headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack()} />,
});

AsignaturaScreen.propTypes = {
  navigation: PropTypes.any,
};

export default AsignaturaScreen;
