import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const getPushNotificationToken = async () => {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') return undefined;

  const token = await Notifications.getExpoPushTokenAsync();

  return token;
};

export default getPushNotificationToken;
