import Nota from './NotaInterface';

export default interface Grade {
  courseId: string;
  name: string;
  notas: Nota[];
}
