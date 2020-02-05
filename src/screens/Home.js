import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StatusBar, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../constants/colors';

const HomeScreen = ({ navigation }) => {
  StatusBar.setBackgroundColor(Colors.white);

  const signOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.any,
};

export default HomeScreen;
