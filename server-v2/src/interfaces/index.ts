export interface ServiceResponse<T> {
  total: number;
  limit: number;
  skip: number;
  data: Partial<T>[];
}

export interface TrackerCourse {
  courseId: string;
  curso: string;
  nombre: string;
  aula: string;
  sede: string;
  turno: string;
  color: string;
  dia: number[];
  hora: string[];
  horaT: string[];
}
export interface TrackerGrade {
  courseId: string; // courseSigaId in our model.
  name: string;
  notas: {
    instancia: string;
    calificacion: number;
  }[];
}
