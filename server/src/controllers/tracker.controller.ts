import { ObjectID } from 'mongodb';
import { Response, Request, NextFunction } from 'express';

import { Event } from '../interfaces/TrackerInterface';

import TrackerService, { EventResponse } from '../services/TrackerServices';

class TrackerController {
  static async eventHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = req.params;
      const { event, data } = req.body;

      if (!data) {
        res.status(400);
        return next(new Error('Event data is required.'));
      }
      if (!event) {
        res.status(400);
        return next(new Error('Event type is required.'));
      }

      const userId = new ObjectID(user_id);

      let eventResponse: EventResponse;

      switch (event as Event) {
        case 'new-course':
          eventResponse = await TrackerService.eventNewCourse(userId, data);
          break;
        case 'new-grade':
          eventResponse = await TrackerService.eventNewGrade(userId, data);
          break;

        default:
          res.status(422);
          return next(new Error('Invalid event.'));
      }
      if (!eventResponse.success) {
        res.status(400);
        throw new Error(eventResponse.reason);
      }

      return res.sendStatus(200);
    } catch (error) {
      if (
        error.message ===
        'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters'
      ) {
        return next(new Error('Invalid id format.'));
      }
      return next(error);
    }
  }
}

export default TrackerController;
