import { ObjectID } from 'mongodb';
import { Response, Request, NextFunction } from 'express';

import CourseService from '../services/CourseServices';
import Course from '../interfaces/CourseInterface';
import Nota from 'interfaces/NotaInterface';

class TrackerController {
  static async detectedNewCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const courses: Course[] = req.body.data;

      if (!id) {
        res.status(400);
        throw new Error('User id not provided.');
      }
      const userId = new ObjectID(id);

      if (!courses || !(courses.length > 0)) {
        res.status(400);
        throw new Error('Courses not provided in body.');
      }
      const promises = courses.map(course => {
        return CourseService.createCourse({ ...course, userId });
      });
      const result = await Promise.all(promises);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async detectedNewGrade(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      interface NewGradeData {
        courseId: string;
        name: string;
        notas: Nota[];
      }

      const data: NewGradeData = req.body.data;

      if (!id) {
        res.status(400);
        throw new Error('User id not provided.');
      }
      const userId = new ObjectID(id);

      if (!data) {
        res.status(400);
        throw new Error('Grades not provided in body.');
      }

      const courses = await CourseService.getCoursesByUser(userId);
      console.log(courses);
      const course = courses.find(a => a.courseId === data.courseId);
      if (!course) {
        throw new Error('Course does not exists.');
      }
      const nota = await CourseService.newNota(course, data.notas);

      return res.json(nota);
    } catch (error) {
      return next(error);
    }
  }
}

export default TrackerController;
