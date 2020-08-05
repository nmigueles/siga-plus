import { ObjectID } from 'mongodb';

import courseModel from '../models/Course';
import Course from '../interfaces/CourseInterface';
import Nota from 'interfaces/NotaInterface';

class CourseService {
  static async createCourse(asignatura: Course): Promise<Course> {
    const newAsignatura: Course = await new courseModel(asignatura).save();
    return newAsignatura;
  }

  static async getCoursesByUser(userId: ObjectID): Promise<Course[]> {
    const asignaturas: Course[] = await courseModel.find({ userId });
    return asignaturas;
  }

  static async getCourseById(courseId: string): Promise<Course> {
    const id = new ObjectID(courseId);
    const course: Course = await courseModel.findById(id);
    return course;
  }

  static async courseExistInUser(userId: ObjectID, courseId: string): Promise<boolean> {
    const courses = await this.getCoursesByUser(userId);
    const course = courses.find(c => c.courseId === courseId);
    return !!course;
  }

  static async updateColor(courseId: string, newColor: string): Promise<Course> {
    const _id = new ObjectID(courseId);
    const updatedAsignatura = await courseModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          color: newColor,
        },
      },
      { new: true }
    );
    return updatedAsignatura;
  }

  static async newNota(course: Course, newNotas: Nota[]): Promise<Course> {
    if (!course) {
      throw new Error('Course not found.');
    }
    const notas: Nota[] = [...course.notas, ...newNotas];

    const updatedCourse = await courseModel.findOneAndUpdate(
      { _id: course.id },
      {
        $set: {
          notas,
        },
      },
      { new: true }
    );
    return updatedCourse;
  }
}

export default CourseService;
