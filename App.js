import React from 'react';
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
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        height: 60,
      },
    },
  }
);

const AppContainer = createAppContainer(RootStack);

const App = () => {
  return (
    <>
      <AppContainer />
    </>
  );
};
export default App;
