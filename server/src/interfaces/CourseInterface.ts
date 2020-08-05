import { ObjectID } from 'mongodb';

import Nota from './NotaInterface';

export type WeekDayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Turno = 'Mañana' | 'Tarde' | 'Noche';

export default interface Course {
  id?: ObjectID;
  userId: ObjectID;
  courseId: string;
  curso: string;
  nombre: string;
  color: string;
  turno: Turno;
  notas?: Nota[];
  dia: WeekDayNumber[];
  hora: string[];
  horaT: string[];
  aula: string;
  sede: string;
  estado: string;
}
