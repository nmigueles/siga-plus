import { Router } from 'express';

import TrackerController from '../controllers/tracker.controller';

const trackerRouter = Router();

trackerRouter.post('/event/:user_id', TrackerController.eventHandler);

export default trackerRouter;
