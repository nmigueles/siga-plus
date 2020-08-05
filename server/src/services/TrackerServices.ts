import { ObjectID } from 'mongodb';

import UserService from './UserServices';
import CourseService from '../services/CourseServices';

import { sendNotification } from '../tasks/sendNotification';

import Course from '../interfaces/CourseInterface';
import Grade from '../interfaces/GradeInterface';

import notasToString from '../helpers/notasToString';

export interface EventData {
  courses?: Course[];
  grades?: Grade[];
}

export interface EventResponse {
  success: boolean;
  reason?: string;
}

class TrackerService {
  static createTrackerToken() {
    return;
  }

  static async eventNewGrade(
    userId: ObjectID | string,
    { grades }: EventData
  ): Promise<EventResponse> {
    // Bussiness logic for detecting a new grade.
    try {
      if (!grades) throw new Error('Grades are required in new-grade event.');

      const id = new ObjectID(userId);

      const expoPushToken = await UserService.getExpoToken(userId);

      const courses = await CourseService.getCoursesByUser(id);

      const promises = grades.map(grade => {
        if (expoPushToken) {
          const notas: string = notasToString(grade.notas);

          sendNotification(
            `Se detectaron nuevas notas te sacaste un ${notas}} en ${grade.name}`,
            'Nueva nota',
            expoPushToken
          );
        }
        const course = courses.find(a => a.courseId === grade.courseId);
        return CourseService.newNota(course, grade.notas);
      });
      await Promise.all(promises);

      return { success: true };
    } catch (error) {
      return { success: false, reason: error.message };
    }
  }

  static async eventNewCourse(
    userId: ObjectID | string,
    { courses }: EventData
  ): Promise<EventResponse> {
    // Bussiness logic for detecting a new course.
    try {
      if (!courses) throw new Error('Courses are required in new-course event.');

      const id = new ObjectID(userId);
      const expoPushToken = await UserService.getExpoToken(userId);

      if (expoPushToken) {
        const len = courses.length;
        sendNotification(
          `Se ${len === 1 ? 'detectó un nuevo curso.' : `detectaron ${len} nuevos cursos.`}`,
          len === 1 ? 'Nuevo curso' : `Nuevos cursos`,
          expoPushToken
        );
      }
      // Create new courses
      const promises = courses.map(course => CourseService.createCourse({ ...course, userId: id }));
      await Promise.all(promises);

      return { success: true };
    } catch (error) {
      return { success: false, reason: error.message };
    }
  }
}

export default TrackerService;
