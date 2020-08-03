/* eslint-disable no-console */
import { API_BASE_URL } from '../constants/backend';

import AuthService from './authService';

class UserService {
  user = undefined;

  /**
   * Devuelve el usuario logeado.
   */
  static async getUser() {
    if (this.user) {
      return this.user;
    }
    const GET_ME_URI = `${API_BASE_URL}/user/me`;
    try {
      const token = await AuthService.getUserToken();
      if (!token) throw new Error('Error getting token');

      const response = await fetch(GET_ME_URI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) return {};
      const user = await response.json();
      this.user = user;
      return user;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  static async updatePushToken(expoPushToken) {
    const URI = `${API_BASE_URL}/user/push-notifications`;
    try {
      const userToken = await AuthService.getUserToken();
      if (!userToken) throw new Error('Error getting token');
      console.log(userToken);
      const body = JSON.stringify({
        token: expoPushToken,
      });
      console.log(body);
      const response = await fetch(URI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body,
      });
      if (!response.ok) return { success: false };
      const { success } = await response.json();
      return success;
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }
}
export default UserService;
