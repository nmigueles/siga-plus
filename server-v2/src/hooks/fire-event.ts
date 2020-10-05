/* eslint-disable indent */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from '@feathersjs/feathers';
import notasToString from '../utils/notasToString';
import { sendNotification } from '../utils/sendNotification';
interface TrackerCourse {
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
interface TrackerGrade {
  courseId: string; // courseSigaId in our model.
  name: string;
  notas: {
    instancia: string;
    calificacion: number;
  }[];
}

async function eventNewGrade(
  app: Application,
  userId: string,
  expoPushToken: string,
  { grades }: { grades: TrackerGrade[] }
) {
  // Bussiness logic for detecting a new grade.
  if (!grades) throw new Error('No grades provided.');

  const { data: courses } = await app.service('courses').find();
  console.log(courses);
  const byCourseSigaId = courses.reduce(
    (byId: Record<string, any>, course: { courseSigaId: string }) => {
      byId[course.courseSigaId] = course;
      return byId;
    },
    {}
  );

  console.log(byCourseSigaId);

  for await (const trackerGrade of grades) {
    if (trackerGrade.notas.length) {
      if (expoPushToken) {
        const notas: string = notasToString(trackerGrade.notas);
        sendNotification(
          app,
          `Se detectaron nuevas notas te sacaste un ${notas}} en ${trackerGrade.name}`,
          'Nueva nota',
          expoPushToken
        );
      }
      const courseId = byCourseSigaId[trackerGrade.courseId]._id;

      trackerGrade.notas.map(({ instancia: instance, calificacion: value }) => {
        return app.service('grades').create({ courseId, instance, value });
      });
    }
  }
}

async function eventNewCourse(
  app: Application,
  userId: string,
  expoPushToken: string,
  { courses }: { courses: TrackerCourse[] }
) {
  // Bussiness logic for detecting a new course.
  if (!courses) throw new Error('No courses provided.');

  if (expoPushToken) {
    const len = courses.length;
    sendNotification(
      app,
      `Se ${len === 1 ? 'detectó un nuevo curso.' : `detectaron ${len} nuevos cursos.`}`,
      len === 1 ? 'Nuevo curso' : 'Nuevos cursos',
      expoPushToken
    );
  }

  // Create new courses
  await Promise.all(
    courses.map(course => {
      app.service('courses').create({ ...course, userId });
    })
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    // Fire event
    if (context.type !== 'after') throw new Error('The hook is an after hook only.');

    if (context.result) {
      const { event, data, userId } = context.result;
      const user = await context.app.service('users').get(userId);

      switch (event) {
        case 'new-course':
          await eventNewCourse(context.app, userId, user.expoPushToken, data);
          break;
        case 'new-grade':
          await eventNewGrade(context.app, userId, user.expoPushToken, data);
          break;

        default:
          throw new Error('Event not found.');
      }
    }
    return context;
  };
};
