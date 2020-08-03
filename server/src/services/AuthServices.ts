import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UnauthorizedException from '../exceptions/UnauthorizedException';

import { User } from '../models/User';
import Payload from '../interfaces/PayloadInterface';

import UserService from './UserServices';

const { JWT_SECRET } = process.env;

interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}
interface DecodeTokenResponse {
  error?: {
    status: number;
    error: Error;
  };
  payload?: Payload;
}

class AuthService {
  private static responseInvalidCredentials: AuthResponse = {
    success: false,
    message: 'User credentials are invalid.',
  };

  static async hashPassword(password: string): Promise<string> {
    const hashedPassword = bcrypt.hash(password, 12);
    return hashedPassword;
  }

  static async checkPassword(password: string, userPassword: string): Promise<boolean> {
    const match = await bcrypt.compare(password, userPassword);
    return match;
  }

  static generateToken(user: User): string {
    const token = jwt.sign(
      {
        jid: user.id,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return token;
  }

  static decodeToken(rawToken: string): DecodeTokenResponse {
    if (!rawToken) {
      return {
        error: {
          status: 401,
          error: new UnauthorizedException('Unauthorized: missing authorization token.'),
        },
      };
    }

    // Bearer token
    const token = rawToken.split(' ')[1];

    if (!token) {
      return {
        error: {
          status: 400,
          error: new UnauthorizedException('Unauthorized: malformed token.'),
        },
      };
    }

    const payload: Payload = jwt.verify(token, JWT_SECRET) as Payload;
    return { payload };
  }

  static verifyToken(token: string): boolean {
    const valid = jwt.verify(token, JWT_SECRET);
    if (valid) return true;
    return false;
  }

  static async login(username: string, password: string): Promise<AuthResponse> {
    const user = await UserService.getUserByUsername(username, true);

    if (!user) return this.responseInvalidCredentials;
    const match = await this.checkPassword(password, user.password);

    if (!match) return this.responseInvalidCredentials;

    const token = this.generateToken(user);

    return { token, success: true };
  }

  static async register(user: User): Promise<AuthResponse> {
    if (await UserService.userExists(user.username)) {
      return { success: false, message: 'User already exists.' };
    }
    user.password = await AuthService.hashPassword(user.password);
    const resgisteredUser = await UserService.createUser(user);
    return { success: true, user: resgisteredUser };
  }
}

export default AuthService;
