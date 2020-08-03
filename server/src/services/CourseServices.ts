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

  static async newNota(course: Course, notas: Nota[]): Promise<Course> {
    const newNotas: Nota[] = [...course.notas, ...notas];

    console.log({ newNotas });

    const updatedCourse = await courseModel.findOneAndUpdate(
      { _id: course.id },
      {
        $set: {
          notas: newNotas,
        },
      },
      { new: true }
    );
    return updatedCourse;
  }
}

export default CourseService;
