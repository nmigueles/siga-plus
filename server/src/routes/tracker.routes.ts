import { Router } from 'express';

import CourseController from '../controllers/course.controller';

import { notifyUser } from '../middlewares';

const trackerRouter = Router();

trackerRouter.post('/new/course/:user_id', notifyUser, CourseController.detectedNewCourse);
trackerRouter.post('/new/grade/:user_id', notifyUser, CourseController.detectedNewGrade);

export default trackerRouter;
