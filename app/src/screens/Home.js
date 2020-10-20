/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';

import UserService from '../services/userService';

import Colors from '../constants/colors';
import AppLogo from '../components/base/AppLogo';
import MessageBox from '../components/base/MessageBox';
import AsignaturaDelDia from '../components/asignatura/AsignaturaDelDia';

import { registerForPushNotificationsAsync } from '../utils/registerForPushNotificationsAsync';

const HomeScreen = () => {
  StatusBar.setBackgroundColor(Colors.white);
  const [notification, setNotification] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => {
        UserService.getUser().then(({ expoPushToken }) => {
          if (!expoPushToken || expoPushToken !== token) {
            UserService.updatePushToken(token).then(console.log);
          }
        });
      })
      .catch(console.error);

    notificationListener.current = Notifications.addNotificationReceivedListener(
      notification => {
        setNotification(notification.request.content.body || '');
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      response => {
        setNotification(response.notification.request.content.body || '');
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <ScrollView>
      {!!notification && <MessageBox type="info" message={notification} />}
      <AsignaturaDelDia />
    </ScrollView>
  );
};

HomeScreen.navigationOptions = () => ({
  headerTitle: () => <AppLogo size={23} />,
});

export default HomeScreen;
