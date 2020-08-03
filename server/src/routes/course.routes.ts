import { Router } from 'express';

import CourseController from '../controllers/course.controller';

import { notifyUser } from '../middlewares';
import Privileges from '../middlewares/privileges';

const courseRouter = Router();

courseRouter.get('/', Privileges.requireLogin(), CourseController.getUserCourses);
courseRouter.post('/create', Privileges.requireLogin(), CourseController.create);
courseRouter.post('/color/:id', Privileges.requireLogin(), CourseController.changeColor);
courseRouter.post('/notas/:id', Privileges.requireLogin(), CourseController.changeNotas);

// Tracker webhooks.
courseRouter.post('/detected-new/course/:id', notifyUser, CourseController.detectedNewCourse);
courseRouter.post('/detected-new/grade/:id', notifyUser, CourseController.detectedNewGrade);

export default courseRouter;
