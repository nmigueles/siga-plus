import React, { useState } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../../constants/colors';

import CustomButton from '../base/CustomButtom';

const styles = StyleSheet.create({
  logout: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 0,
    backgroundColor: Colors.white,
    borderTopColor: Colors.grey,
    borderTopWidth: 1,
  },
});

const logout = async () => {
  await AsyncStorage.clear();
  await new Promise(resolve => setTimeout(resolve, 800));
};

const LogoutButton = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      setLoading(false);
      setDone(true);
      setTimeout(() => {
        navigation.navigate('Login');
      }, 500);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Detected error while login out: ', error);
    }
  };

  return (
    <CustomButton
      style={styles.logout}
      textStyle={{ color: Colors.main, fontWeight: 'bold' }}
      title="Cerrar Sesión"
      onPress={handleLogout}
      loading={loading}
      activityIndicatorColor={Colors.main}
      done={done}
      doneIcon="md-log-out"
      doneBgColor={Colors.error}
    />
  );
};

LogoutButton.propTypes = {
  navigation: PropTypes.any,
};

export default LogoutButton;
