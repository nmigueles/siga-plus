import { Hook, HookContext } from '@feathersjs/feathers';
import { Application } from '../declarations';
import { ServiceResponse, TrackerGrade, TrackerCourse } from '../interfaces';
import { Course } from '../models/courses.model';
import { MTracker } from '../models/tracker.model';

import { notasToString, sendNotification } from '../utils';
// TODO Separar logica del guardado de información y el avisar al usuario. Este hook solo deberia contener la notificación.
async function eventNewGrade(app: Application, expoPushToken: string, grades: TrackerGrade[]) {
  // Bussiness logic for detecting a new grade.

  const { data: courses } = (await app.service('courses').find()) as ServiceResponse<Course>;

  const byCourseSigaId = courses.reduce((byId: Record<string, Partial<Course>>, course) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    byId[course.courseSigaId!] = course;
    return byId;
  }, {});

  for await (const trackerGrade of grades) {
    if (trackerGrade.notas.length) {
      try {
        const courseId = byCourseSigaId[trackerGrade.courseId]._id;
        await Promise.all(
          trackerGrade.notas.map(({ instancia: instance, calificacion: value }) => {
            return app.service('grades').create({ courseId, instance, value });
          })
        );
      } catch (error) {
        if (error instanceof TypeError) {
          throw new Error(`The courseSigaId ${trackerGrade.courseId} does not exist.`);
        } else {
          throw error;
        }
      }

      if (expoPushToken) {
        const notas: string = notasToString(trackerGrade.notas);
        sendNotification(
          app,
          `Se detectaron nuevas notas te sacaste un ${notas}} en ${trackerGrade.name}`,
          'Nueva nota',
          expoPushToken
        );
      }
    }
  }
}

async function eventNewCourse(
  app: Application,
  userId: string,
  expoPushToken: string,
  courses: TrackerCourse[]
) {
  // Bussiness logic for detecting a new course.
  // Create new courses
  await Promise.all(
    courses.map(course => {
      const newCourse: Partial<Course> = {
        courseSigaId: course.courseId,
        name: course.nombre,
        colour: course.color,
        course: course.curso,
        shift: course.turno,
        classroom: course.aula,
        campus: course.sede,
        day: course.dia,
        startHour: course.hora,
        finishHour: course.horaT,
      };
      app.service('courses').create({ ...newCourse, userId });
    })
  );

  if (expoPushToken) {
    const len = courses.length;
    sendNotification(
      app,
      `Se ${len === 1 ? 'detectó un nuevo curso.' : `detectaron ${len} nuevos cursos.`}`,
      len === 1 ? 'Nuevo curso' : 'Nuevos cursos',
      expoPushToken
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext<MTracker>): Promise<HookContext<MTracker>> => {
    // Fire event
    if (context.type !== 'after') {
      throw new Error('The fire-event hook is available only as an after hook.');
    }

    if (context.result) {
      const app = context.app as Application;
      const { event, data, userId } = context.result;
      const user = await app.service('users').get(userId);

      /* eslint-disable indent */
      switch (event) {
        case 'new-course':
          if (!data.courses) throw new Error('Courses data not provided in related event.');
          await eventNewCourse(app, userId, user.expoPushToken, data.courses);
          break;
        case 'new-grade':
          if (!data.grades) throw new Error('Grades data not provided in related event.');
          await eventNewGrade(app, user.expoPushToken, data.grades);
          break;

        default:
          throw new Error('Event not found.');
      }
      /* eslint-enable indent */
    }
    return context;
  };
};
