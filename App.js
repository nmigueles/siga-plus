import React from 'react';
import { Icon } from 'native-base';
import ErrorBoundary from 'react-native-error-boundary';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';

import HomeScreen from './src/screens/Home';
import LoginScreen from './src/screens/Login';
import CursadaScreen from './src/screens/Cursada';
import AsignaturaScreen from './src/screens/Asignatura';
import AuthLoadingScreen from './src/screens/AuthLoading';
import CustomFallback from './src/screens/CustomFallback';

import CustomDrawer from './src/components/base/CustomDrawer';

const defaultNavigationOptions = ({ navigation }) => ({
  headerTitleAlign: 'center',
  safeAreaInsets: { top: 0 },
  // eslint-disable-next-line react/display-name
  headerLeft: () => (
    <Icon
      name="menu"
      size={35}
      style={{
        marginLeft: 20,
      }}
      onPress={() => navigation.openDrawer()}
    />
  ),
  ...TransitionPresets.SlideFromRightIOS,
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

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    Cursada: {
      screen: CursadaStack,
    },
  },
  {
    contentComponent: CustomDrawer,
  }
);

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

const App = () => (
  <ErrorBoundary>
    <AppContainer />
  </ErrorBoundary>
);

export default App;
