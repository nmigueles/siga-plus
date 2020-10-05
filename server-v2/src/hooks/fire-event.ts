/* eslint-disable indent */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from '@feathersjs/feathers';
import notasToString from '../utils/notasToString';
import { sendNotification } from '../utils/sendNotification';

export interface EventData {
  courses?: any[];
  grades?: any[];
}

async function eventNewGrade(
  app: Application,
  userId: string,
  expoPushToken: string,
  { grades }: EventData
) {
  // Bussiness logic for detecting a new grade.
  if (!grades) throw new Error('No grades provided.');

  const courses = await app.service('courses').find({ userId });
  console.log(courses);

  const promises = grades.map(grade => {
    if (expoPushToken) {
      const notas: string = notasToString(grade.notas);
      sendNotification(
        `Se detectaron nuevas notas te sacaste un ${notas}} en ${grade.name}`,
        'Nueva nota',
        expoPushToken
      );
    }
    const course = courses.find((a: { courseId: string }) => a.courseId === grade.courseId);
    return app.service('courses').create(course, grade.notas);
  });
  await Promise.all(promises);
}

async function eventNewCourse(
  app: Application,
  userId: string,
  expoPushToken: string,
  { courses }: EventData
) {
  // Bussiness logic for detecting a new course.
  if (!courses) throw new Error('No courses provided.');

  if (expoPushToken) {
    const len = courses.length;
    sendNotification(
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
