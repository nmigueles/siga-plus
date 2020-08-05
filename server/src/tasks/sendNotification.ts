import Axios from 'axios';

/**
 * La función envia una notificación a la aplicación
 * @param value1 Mensaje a enviar en el cuerpo de la notificación.
 */
export const sendNotification = (body: string, title: string, expoPushToken: string) => {
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
      'https://maker.ifttt.com/trigger/notify/with/key/j-XX_O_dBURjDrOFyx2xdcSefeA0BeI-xcF2fen_gW9',
      {
        value1: `No se pudo enviar la notificación a la app, error_msg: ${error.message}`,
      }
    );
  }
};
