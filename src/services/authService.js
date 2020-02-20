/* eslint-disable no-console */
import { AsyncStorage } from 'react-native';
import { API_BASE_URL } from '../constants/backend';

class AuthService {
  static async login(username, password) {
    const LOGIN_URI = `${API_BASE_URL}/auth/login`;
    try {
      const response = await fetch(LOGIN_URI, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { success, token, message } = await response.json();
      return { success, token, message };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  static async setUserToken(token) {
    try {
      await AsyncStorage.setItem('userToken', token);
    } catch (error) {
      console.log(error);
    }
  }

  static async verifyToken(token) {
    const LOGIN_URI = `${API_BASE_URL}/auth/verify-user-token`;
    try {
      const response = await fetch(LOGIN_URI, {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { valid, reason, error } = await response.json();
      if (error || !valid) return { valid, reason: 'error' };
      if (reason && !valid) return { valid, reason };
      if (valid) return { valid };
      return { valid: false };
    } catch (error) {
      console.log(error);
      return { valid: false, reason: 'error' };
    }
  }

  static async checkIfLogged() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return false;
      const { valid, reason } = await this.verifyToken(token);
      return { valid, reason };
    } catch (error) {
      return { valid: false };
    }
  }
}
export default AuthService;
