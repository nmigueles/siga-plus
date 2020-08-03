import Course from '../interfaces/CourseInterface';
import { Document, Schema, model } from 'mongoose';

const stringRequired = { type: String, required: true };

export const courseSchema = new Schema(
  {
    userId: stringRequired,
    courseId: stringRequired,
    nombre: stringRequired,
    color: stringRequired,
    curso: stringRequired,
    turno: stringRequired,
    notas: { type: Array, default: [] },
    dia: { type: [Number], required: true },
    hora: { type: [String], required: true },
    horaT: { type: [String], required: true },
    aula: stringRequired,
    sede: stringRequired,
    estado: { type: String, default: 'Cursando' },
  },
  { timestamps: true }
);

const courseModel = model<Course & Document>('Course', courseSchema);

export default courseModel;
