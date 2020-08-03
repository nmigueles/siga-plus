import Nota from './NotaInterface';
import Course from './CourseInterface';

type CourseEvent = Course;

export interface NotasEvent {
  courseId: string;
  name: string;
  notas: Nota[];
}

export interface TrackerEvent {
  event: string;
  data: CourseEvent[] | NotasEvent;
}
