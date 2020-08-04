import { Response, Request, NextFunction } from 'express';

import { User } from 'models/User';

import AuthService from '../services/AuthServices';

import { validateLoginInput } from '../helpers/validateLoginInput';

class AuthController {
  static async doLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        error,
        value: { username, password },
      } = validateLoginInput(req.body);

      if (error) {
        res.status(400);
        return next(error);
      }

      const { success, message, token } = await AuthService.login(username, password);

      if (!success) {
        return res.status(422).json({ success, message });
      }
      return res.json({ success, token });
    } catch (error) {
      return next(error);
    }
  }

  static async doRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, username, password, privileges } = req.body;
      const newUser = {
        name,
        username,
        privileges,
        password,
      };
      const { success, message, user } = await AuthService.register(newUser as User);

      if (!success) {
        res.status(409);
        return res.json({ success, message });
      }
      const userResponse = {
        id: user.id,
        name: user.name,
        username: user.username,
        privileges: user.privileges,
      };
      return res.json({ success, user: userResponse });
    } catch (error) {
      next(error);
    }
  }

  static verifyUserToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body;

      if (!token) {
        res.status(400);
        return next(new Error('Missing user token in request.'));
      }

      const valid = AuthService.verifyToken(token);

      if (valid) {
        return res.json({ valid: true });
      }
      return res.json({ valid: false });
    } catch (error) {
      if ((error as Error).message === 'jwt malformed') {
        res.status(422);
        return res.json({ valid: false, reason: 'Malformed user token.' });
      }
      return res.json({ valid: false, reason: error.message });
    }
  }
}

export default AuthController;
