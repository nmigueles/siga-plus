import { Request, Response, NextFunction } from 'express';

import UserService from '../services/UserServices';

import notasToString from '../helpers/notasToString';

import { sendNotification } from '../tasks/sendNotification';

import { NotasEvent, TrackerEvent } from '../interfaces/TrackerInterface';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error: Error = new Error(`Not Found -  ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(res.statusCode === 200 ? 500 : res.statusCode);
  res.json({
    error: {
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
    },
  });
};

export const notifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400);
      throw new Error('User id not provided.');
    }

    const expoPushToken = await UserService.getExpoToken(id);
    if (!expoPushToken) {
      res.status(412);
      throw new Error('Expo push token was not found in user.');
    }

    const { event, data }: TrackerEvent = req.body;
    const len = (data as NotasEvent).notas.length;

    switch (event) {
      case 'new-grade':
        // Se detecto nueva nota

        // Transformo el array de notas en un mensaje.
        const notas: string = notasToString((data as NotasEvent).notas);

        sendNotification(
          `Se detectaron nuevas notas te sacaste un ${notas}} en ${(data as NotasEvent).name}`,
          'Nueva nota',
          expoPushToken
        );
        break;
      case 'new-course':
        // Se detecto un nuevo curso
        sendNotification(
          `Se ${len === 1 ? 'detectó un nuevo curso.' : `detectaron ${len} nuevos cursos.`}`,
          len === 1 ? 'Nuevo curso' : `Nuevos cursos`,
          expoPushToken
        );
        break;
      default:
        throw new Error('Event do not exist.');
    }
  } catch (error) {
    console.log(error);
  }

  next();
};
