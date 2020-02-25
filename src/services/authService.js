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
      if (!response.ok) return { valid: false };
      const { valid, reason, error } = await response.json();
      if (error || !valid) return { valid: false, reason: error.message || error };
      if (reason && !valid) return { valid: false, reason };
      if (valid) return { valid };
      return { valid: false };
    } catch (error) {
      console.log(error);
      return { valid: false, reason: 'error' };
    }
  }

  static async userValidLogin() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return false;

      const { valid, reason } = await this.verifyToken(token);
      if (reason) console.log(reason);
      if (!valid) await AsyncStorage.removeItem('userToken');

      return valid;
    } catch (error) {
      await AsyncStorage.removeItem('userToken');
      return false;
    }
  }
}
export default AuthService;
