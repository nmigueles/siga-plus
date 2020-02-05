import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/Home';
import LoginScreen from './src/screens/Login';
import CursadaScreen from './src/screens/Cursada';
import AuthLoadingScreen from './src/screens/AuthLoading';
import AsignaturaScreen from './src/screens/Asignatura';

import Logo from './src/components/Logo';

const defaultNavigationOptions = ({ navigation }) => ({
  headerTitleAlign: 'center',
  safeAreaInsets: { top: 0 },
  // eslint-disable-next-line react/display-name
  headerLeft: () => (
    <Ionicons
      name="md-menu"
      size={35}
      style={{
        marginLeft: 20,
      }}
      onPress={() => navigation.openDrawer()}
    />
  ),
  // eslint-disable-next-line react/display-name
  headerRight: () => (
    <Logo
      scale={4}
      style={{
        heigth: 80,
        width: 40,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
      }}
    />
  ),
});

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
  },
  { defaultNavigationOptions }
);
const CursadaStack = createStackNavigator(
  {
    Cursada: { screen: CursadaScreen },
    Asignatura: { screen: AsignaturaScreen },
  },
  { defaultNavigationOptions }
);

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  Cursada: {
    screen: CursadaStack,
  },
});

const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Login: LoginScreen,
    App: DrawerNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const AppContainer = createAppContainer(RootStack);

const App = () => <AppContainer />;

export default App;
