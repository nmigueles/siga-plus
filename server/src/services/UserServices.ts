import { ObjectID } from 'mongodb';

import UserModel, { User } from '../models/User';

class UserService {
  static async getAllUsers(includePassword: boolean = false): Promise<User[]> {
    const users: User[] = await UserModel.find().select(includePassword ? undefined : `-password`);
    return users;
  }

  static async getUserById(id: string | ObjectID, includePassword: boolean = false): Promise<User> {
    const objectId = new ObjectID(id);
    const user: User = await UserModel.findById(objectId).select(
      includePassword ? undefined : `-password`
    );
    return user;
  }
  static async getUserByUsername(
    username: string,
    includePassword: boolean = false
  ): Promise<User> {
    const user: User = await UserModel.findOne({ username }).select(
      includePassword ? undefined : `-password`
    );
    return user;
  }

  static async createUser(user: User): Promise<User> {
    const newUser = new UserModel(user).save();
    return newUser;
  }

  static async userExists(username: string): Promise<boolean> {
    const user = await UserService.getUserByUsername(username);
    const response = !!user;
    return response;
  }

  static async setExpoToken(id: string | ObjectID, token: string) {
    try {
      const user = await this.getUserById(id);
      user.expoPushToken = token;
      await user.save();
      return { token, success: true };
    } catch (error) {
      return { success: false };
    }
  }

  static async getExpoToken(id: string | ObjectID): Promise<string> {
    try {
      const user = await this.getUserById(id);
      return user.expoPushToken;
    } catch (error) {
      return '';
    }
  }
}

export default UserService;
