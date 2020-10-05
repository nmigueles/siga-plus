import * as authentication from '@feathersjs/authentication';
import { setField } from 'feathers-authentication-hooks';
import { HookContext } from '@feathersjs/feathers';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const limitToUser = setField({
  from: 'params.user._id',
  as: 'params.query.userId',
});

export default {
  before: {
    all: [authenticate('jwt')],
    find: [limitToUser],
    get: [],
    create: [
      setField({
        from: 'params.user._id',
        as: 'data.userId',
      }),
    ],
    update: [limitToUser],
    patch: [limitToUser],
    remove: [limitToUser],
  },

  after: {
    all: [],
    find: [
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      async (context: HookContext) => {
        // TODO: use populate
        const courseIds = [
          ...new Set(
            context.result.data.map((course: { _id: { toString: () => string } }) =>
              course._id.toString()
            )
          ),
        ];
        const grades = await context.app.service('grades').find({
          paginate: false,
          query: {
            courseId: {
              $in: courseIds,
            },
          },
        });
        const gradesByCourseId = grades.reduce(
          (
            byId: { [x: string]: any[] },
            grade: { courseId: string | number; instance: string; value: number }
          ) => {
            if (byId[grade.courseId]) {
              byId[grade.courseId].push({ instance: grade.instance, value: grade.value });
            } else {
              byId[grade.courseId] = [{ instance: grade.instance, value: grade.value }];
            }
            return byId;
          },
          {}
        );
        context.result.data.forEach((course: { grades: any; _id: string | number }) => {
          course.grades = gradesByCourseId[course._id];
        });
      },
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
