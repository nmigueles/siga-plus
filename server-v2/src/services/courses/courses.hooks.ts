import * as authentication from '@feathersjs/authentication';
import { setField } from 'feathers-authentication-hooks';
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
