/* eslint-disable no-console */

import { API_BASE_URL } from '../constants/backend';
import AuthService from './authService';

class CoursesService {
  /**
   * Devuelve todos las asignaturas del usuario.
   */
  static async getCourses() {
    const COURSES_URI = `${API_BASE_URL}/course/`;
    try {
      const token = await AuthService.getUserToken();
      if (!token) throw new Error('Error gettin token');
      const response = await fetch(COURSES_URI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const asignaturas = await response.json();
      return asignaturas || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
export default CoursesService;
