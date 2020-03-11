import { today } from './getOrderedWeek';

import CoursesService from '../services/coursesService';

const getAsignaturasDelDia = async () => {
  const courses = await CoursesService.getCourses();
  const filteredCourses = courses.filter(a => a.dia.includes(today));
  const ordered = filteredCourses.sort((a, b) => {
    const getHora = obj => Number(obj.hora[0].split(':')[0]);
    return getHora(a) - getHora(b);
  });
  return ordered;
};

export default getAsignaturasDelDia;
