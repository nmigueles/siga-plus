import React, { useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Logo from '../components/Logo';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login', { logout: true })}>
        <Text>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

HomeScreen.navigationOptions = () => ({
  title: 'SIGA',
  headerLeft: () => null,
  // eslint-disable-next-line react/display-name
  headerRigth: () => (
    <Logo
      scale={4}
      style={{
        heigth: 80,
        width: 40,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        backgroundColor: 'pink',
      }}
    />
  ),
});

export default HomeScreen;
