import Joi from 'joi';

import Course from '../interfaces/CourseInterface';

export default function validateCourseInput(course: Course) {
  const { error, value } = Joi.object({
    userId: Joi.string().required(),
    courseId: Joi.string().alphanum().required(),
    curso: Joi.string().required(),
    nombre: Joi.string().alphanum().required(),
    color: Joi.string().required(),
    turno: Joi.string().valid('Mañana', 'Tarde', 'Noche').required(),
    notas: Joi.array(),
    dia: Joi.array().required(),
    hora: Joi.array().required(),
    horaT: Joi.array().required(),
    aula: Joi.string().alphanum().required(),
    sede: Joi.string().alphanum().required(),
    estado: Joi.string(),
  })
    .options({ abortEarly: false })
    .validate(course);
  return { error, value };
}
