import { Response, Request, NextFunction } from 'express';

import { User } from '../models/User';
import UserService from '../services/UserServices';

class UserController {
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id.match(/^[0-9a-fA-F]{24}$/)) return next(new Error('Invalid id.'));

      const user: User = await UserService.getUserById(id);

      if (!user) {
        res.status(404);
        return next(new Error('User not found.'));
      }

      return res.json(user);
    } catch (error) {
      return next(error);
    }
  }
  static async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = res.locals;
      return res.json(user);
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users: User[] = await UserService.getAllUsers();
      return res.json(users);
    } catch (error) {
      return next(error);
    }
  }

  static getUserCourses(req: Request, res: Response, next: NextFunction) {
    res.json({ test: true });
  }

  static async setExpoPushToken(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.token) throw new Error('Token missing.');
      const { user } = res.locals;
      const { success, token } = await UserService.setExpoToken(user.id, req.body.token);
      return res.json({
        success,
        token,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default UserController;
