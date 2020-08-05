import { Router } from 'express';

import CourseController from '../controllers/course.controller';

import { notifyUser } from '../middlewares';
import Privileges from '../middlewares/privileges';

const courseRouter = Router();

courseRouter.get('/', Privileges.requireLogin(), CourseController.getUserCourses);
courseRouter.post('/create', Privileges.requireLogin(), CourseController.create);
courseRouter.post('/notas/:id', Privileges.requireLogin(), CourseController.changeNotas);

// @Deprecated, unused.
courseRouter.post('/color/:id', Privileges.requireLogin(), CourseController.changeColor);
// @Deprecated Moving to tracker api
courseRouter.post('/detected-new/course/:id', notifyUser, CourseController.detectedNewCourse);
// @Deprecated Moving to tracker api
courseRouter.post('/detected-new/grade/:id', notifyUser, CourseController.detectedNewGrade);

export default courseRouter;
