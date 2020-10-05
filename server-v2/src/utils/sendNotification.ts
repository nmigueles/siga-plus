import { Application } from '@feathersjs/feathers';
import Axios from 'axios';

/**
 * La función envia una notificación a la aplicación
 * @param value1 Mensaje a enviar en el cuerpo de la notificación.
 */
export const sendNotification = (
  app: Application,
  body: string,
  title: string,
  expoPushToken: string
): void => {
  try {
    Axios.post(
      'https://exp.host/--/api/v2/push/send',
      [
        {
          title,
          body,
          to: expoPushToken,
          sound: 'default',
        },
      ],
      {
        headers: {
          host: 'exp.host',
          'Accept-Encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    Axios.post(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      app.get('discord_webhook'),
      { content: `No se pudo enviar la notificación a la app, error_msg: ${error.message}` },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
