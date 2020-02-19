/* eslint-disable no-console */
import { AsyncStorage } from 'react-native';

class ColorService {
  static async saveColor(asignaturaId, color) {
    try {
      await AsyncStorage.setItem(`color-${asignaturaId}`, color);
    } catch (error) {
      console.log(`Error saving the color of ${asignaturaId}. `, error);
    }
  }

  static async getColor(asignaturaId) {
    try {
      return await AsyncStorage.getItem(`color-${asignaturaId}`);
    } catch (error) {
      console.log(`Error getting the color of ${asignaturaId}. `, error);
      return null;
    }
  }
}
export default ColorService;
