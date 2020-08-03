import { Request, Response, NextFunction } from 'express';

import UnauthorizedException from '../exceptions/UnauthorizedException';

import { Scope } from '../types';

import { User } from '../models/User';

import UserService from '../services/UserServices';
import AuthService from '../services/AuthServices';

class Privileges {
  /**
   * Protect the endpoint from not logged users.
   */
  static requireLogin() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { authorization } = req.headers;
        const { error, payload } = AuthService.decodeToken(authorization);

        if (error) {
          res.status(error.status);
          return next(error.error);
        }

        const user: User = await UserService.getUserById(payload.jid);

        if (!user) {
          return next(new Error('Unauthorized: Token User does not exist.'));
        }

        res.locals.user = user;
        return next();
      } catch (error) {
        return next(error);
      }
    };
  }
  /**
   * Checks if user has the scope to realize certain function.
   */
  static userScope(scope: Scope) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        // tslint:disable-next-line: no-shadowed-variable
        function checkPrivileges(user: User) {
          if (!user.privileges.includes(scope)) {
            res.status(401);
            return next(
              new UnauthorizedException("Unauthorized: request out of the user's scopes.")
            );
          }
          return next();
        }

        const storedUser = res.locals.user;
        // Check user from previus middleware
        if (storedUser) {
          return checkPrivileges(storedUser);
        }
        // Check user from token.
        const { authorization } = req.headers;
        const { error, payload } = AuthService.decodeToken(authorization);

        if (error) {
          res.status(error.status);
          return next(error.error);
        }

        const user: User = await UserService.getUserById(payload.jid);

        if (!user) {
          return next(new Error('Unauthorized: Token User does not exist.'));
        }

        return checkPrivileges(user);
      } catch (error) {
        return next(error);
      }
    };
  }
}

export default Privileges;
