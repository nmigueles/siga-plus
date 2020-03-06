/* eslint-disable no-console */
import { API_BASE_URL } from '../constants/backend';

import AuthService from './authService';

class UserService {
  /**
   * Devuelve el usuario logeado.
   */
  static async getUser() {
    const GET_ME_URI = `${API_BASE_URL}/user/me`;
    try {
      const token = await AuthService.getUserToken();
      if (!token) throw new Error('Error gettin token');

      const response = await fetch(GET_ME_URI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) return {};
      const user = await response.json();
      return user;
    } catch (error) {
      console.error(error);
      return {};
    }
  }
}
export default UserService;
