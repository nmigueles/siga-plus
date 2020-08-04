import { Router } from 'express';

import CourseController from '../controllers/course.controller';

import { notifyUser } from '../middlewares';
import Privileges from '../middlewares/privileges';

const courseRouter = Router();

courseRouter.get('/', Privileges.requireLogin(), CourseController.getUserCourses);
courseRouter.post('/create', Privileges.requireLogin(), CourseController.create);
courseRouter.post('/color/:id', Privileges.requireLogin(), CourseController.changeColor);
courseRouter.post('/notas/:id', Privileges.requireLogin(), CourseController.changeNotas);

// @Deprecated Moving to tracker api
courseRouter.post('/detected-new/course/:id', notifyUser, CourseController.detectedNewCourse);
// @Deprecated Moving to tracker api
courseRouter.post('/detected-new/grade/:id', notifyUser, CourseController.detectedNewGrade);

export default courseRouter;
