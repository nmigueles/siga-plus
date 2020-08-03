/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import UserService from '../services/userService';

import Colors from '../constants/colors';
import AppLogo from '../components/base/AppLogo';
import MessageBox from '../components/base/MessageBox';
import AsignaturaDelDia from '../components/asignatura/AsignaturaDelDia';

import registerForPushNotificationsAsync from '../utils/registerForPushNotificationsAsync';

const HomeScreen = () => {
  StatusBar.setBackgroundColor(Colors.white);

  useEffect(() => {
    // TODO Cleanup to it's own function / service.
    registerForPushNotificationsAsync()
      .then(token => {
        UserService.getUser().then(({ expoPushToken }) => {
          if (!expoPushToken) {
            UserService.updatePushToken(token).then(console.log);
          } else {
            console.info('Expo push token already saved.');
          }
        });
      })
      .catch(console.error);
  }, []);

  return (
    <ScrollView>
      <MessageBox
        message="La app ahora se auto publica gracias a nuestro CI/CP"
        type="info"
      />
      <AsignaturaDelDia />
    </ScrollView>
  );
};

HomeScreen.navigationOptions = () => ({
  headerTitle: () => <AppLogo size={23} />,
});

export default HomeScreen;
