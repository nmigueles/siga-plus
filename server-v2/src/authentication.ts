import { Query, Params, ServiceAddons } from '@feathersjs/feathers';
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { expressOauth } from '@feathersjs/authentication-oauth';

import { Application } from './declarations';

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<any>;
  }
}

class MyLocalStrategy extends LocalStrategy {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getEntityQuery(query: Query, params: Params) {
    // Query for use but only include `active` users
    return {
      ...query,
      locked: false,
      $limit: 1,
    };
  }
}

export default function (app: Application): void {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new MyLocalStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
}
