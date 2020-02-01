import React, { useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';
import Logo from '../components/Logo';

const HomeScreen = () => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
};

HomeScreen.navigationOptions = () => ({
  title: 'SIGA',
  // eslint-disable-next-line react/display-name
  headerLeft: () => (
    <Logo
      scale={4}
      style={{
        heigth: 80,
        width: 40,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
      }}
    />
  ),
});

export default HomeScreen;
