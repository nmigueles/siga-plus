import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './src/screens/Login';
import HomeScreen from './src/screens/Home';
import DetailsScreen from './src/screens/Details';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Login',
  },
);

const AppContainer = createAppContainer(RootStack);

export default App = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0)"
        barStyle="dark-content"
      />
      <AppContainer />
    </>
  );
};
