import { ObjectID } from 'mongodb';
import { Response, Request, NextFunction } from 'express';

import CourseService from '../services/CourseServices';
import Course from '../interfaces/CourseInterface';
import Nota from 'interfaces/NotaInterface';
import { User } from '../models/User';

class CourseController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User = res.locals.user;

      if (!user) {
        res.status(400);
        throw new Error('Expected logged user. Not found.');
      }

      const {
        nombre,
        courseId,
        dia,
        curso,
        turno,
        hora,
        horaT,
        aula,
        sede,
        estado,
        color,
      } = req.body;

      const newCourse: Course = {
        nombre,
        courseId,
        dia,
        curso,
        turno,
        hora,
        horaT,
        aula,
        sede,
        estado,
        color,
        userId: user.id,
      };
      const created = await CourseService.createCourse(newCourse);
      return res.json(created);
    } catch (error) {
      return next(error);
    }
  }

  static async changeColor(req: Request, res: Response, next: NextFunction) {
    try {
      const { color } = req.body;
      const { id } = req.params;

      if (!color) {
        res.status(400);
        throw new Error('Expected color. Not found.');
      }
      const changed = await CourseService.updateColor(id, color);
      return res.json(changed);
    } catch (error) {
      return next(error);
    }
  }

  static async changeNotas(req: Request, res: Response, next: NextFunction) {
    try {
      const { notas } = req.body;
      const { id } = req.params;

      if (!notas || !notas.length) {
        res.status(400);
        throw new Error('Expected an array of grades.');
      }

      const course = await CourseService.getCourseById(id);
      const changed = await CourseService.newNota(course, notas);
      return res.json(changed);
    } catch (error) {
      return next(error);
    }
  }

  static async getUserCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User = res.locals.user;

      if (!user) {
        res.status(400);
        throw new Error('Expected logged user. Not found.');
      }

      const courses: Course[] = await CourseService.getCoursesByUser(user.id);
      return res.json(courses);
    } catch (error) {
      next(error);
    }
  }

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

export default CourseController;
