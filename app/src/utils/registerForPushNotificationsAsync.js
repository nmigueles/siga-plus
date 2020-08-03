/* eslint-disable no-alert */
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      throw new Error('Failed to get push token for push notification!');
    }
    try {
      const expoToken = await Notifications.getExpoPushTokenAsync();
      token = expoToken;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error({ debug: 'Error en registerForPushNotificationsAsync.js', error });
    }
  } else {
    throw new Error('Must use physical device for Push Notifications');
  }

  // Notifications.addListener(({ data }) => {
  //   // eslint-disable-next-line no-console
  //   console.log(data);
  // });

  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
  }

  return token;
}
