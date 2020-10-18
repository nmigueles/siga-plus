import * as authentication from '@feathersjs/authentication';
import { setField } from 'feathers-authentication-hooks';
import { disallow } from 'feathers-hooks-common';
import fireEvent from '../../hooks/fire-event';
import lastInFirstOut from '../../hooks/last-in-first-out';
// Don't remove this comment. It's needed to format import lines nicely.

const internalOnly = disallow('external');
const { authenticate } = authentication.hooks;

const limitToUser = setField({
  from: 'params.user._id',
  as: 'params.query.userId',
});

export default {
  before: {
    all: [],
    find: [authenticate('jwt'), limitToUser, lastInFirstOut()],
    get: [internalOnly],
    create: [
      setField({
        from: 'params.query.userId',
        as: 'data.userId',
      }),
    ],
    update: [internalOnly],
    patch: [internalOnly],
    remove: [internalOnly],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [fireEvent()],
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
