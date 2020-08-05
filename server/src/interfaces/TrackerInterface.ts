import Nota from './NotaInterface';
import Course from './CourseInterface';

type CourseEvent = Course;

export interface NotasEvent {
  courseId: string;
  name: string;
  notas: Nota[];
}
interface Events {
  'new-course': undefined;
  'new-grade': undefined;
}
export type Event = keyof Events;

// @Deprecated
export interface TrackerEvent {
  event: Event;
  data: CourseEvent[] | NotasEvent;
}
