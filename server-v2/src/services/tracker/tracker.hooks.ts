import { setField } from 'feathers-authentication-hooks';
import { disallow } from 'feathers-hooks-common';
import fireEvent from '../../hooks/fire-event';
// Don't remove this comment. It's needed to format import lines nicely.

const internalOnly = disallow('external');

export default {
  before: {
    all: [],
    find: [internalOnly],
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
