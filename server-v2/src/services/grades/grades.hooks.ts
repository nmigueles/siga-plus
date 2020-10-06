import * as authentication from '@feathersjs/authentication';
import { setField } from 'feathers-authentication-hooks';
// import { disallow } from 'feathers-hooks-common';
// Don't remove this comment. It's needed to format import lines nicely.

// const internalOnly = disallow('external');
const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      setField({
        from: 'params.query.courseId',
        as: 'data.courseId',
      }),
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
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
