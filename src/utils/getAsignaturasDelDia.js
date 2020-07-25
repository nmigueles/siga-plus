import { today } from './getOrderedWeek';

import CoursesService from '../services/coursesService';

const getAsignaturasDelDia = async () => {
  const courses = await CoursesService.getCourses();
  const filteredCourses = courses.filter(a => a.dia.includes(today));

  const testCourses = {
    _id: '5f139eb1f86b42001e1abe68',
    aula: 'mi casa',
    color: '#DC94F3',
    courseId: '00000',
    curso: 'K1052',
    dia: [1, 2, 3, 4, 5, 6],
    estado: 'Cursando',
    hora: ['17:00'],
    horaT: ['17:35'],
    nombre: 'Test',
    notas: [],
    sede: 'Virtual',
    turno: 'Noche',
    userId: '5e4e1b197a3448000701eb57',
  };
  filteredCourses.push(testCourses);

  const ordered = filteredCourses.sort((a, b) => {
    const getHora = obj => Number(obj.hora[0].split(':')[0]);
    return getHora(a) - getHora(b);
  });
  return ordered;
};

export default getAsignaturasDelDia;
