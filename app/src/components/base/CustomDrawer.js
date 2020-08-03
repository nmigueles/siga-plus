import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerNavigatorItems } from 'react-navigation-drawer';

import UserService from '../../services/userService';

import Colors from '../../constants/colors';

import UserLoading from './UserLoading';
import LogoutButton from '../login/LogoutButton';

import wait from '../../utils/wait';

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  topDrawer: {
    paddingVertical: 20,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
    marginBottom: 10,
  },
  userName: {
    fontSize: 17,
    color: Colors.main,
  },
  userCarrera: {
    fontSize: 12,
    color: Colors.strongGrey,
  },
});

const getUser = async () => {
  const user = await UserService.getUser();
  return user;
};

const CustomDrawer = props => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser().then(response => {
      setUser(response);
      wait(1000).then(() => setLoading(false));
    });
  }, []);
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.topDrawer}>
        {loading ? (
          <UserLoading />
        ) : (
          <>
            <Image style={styles.userImage} source={{ uri: user.img }} />
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userCarrera}>{user.carrera}</Text>
          </>
        )}
      </View>
      <DrawerNavigatorItems
        {...props}
        activeBackgroundColor={Colors.grey3}
        activeTintColor={Colors.main}
      />
      <LogoutButton navigation={props.navigation} />
    </View>
  );
};

CustomDrawer.propTypes = {
  navigation: PropTypes.any,
};

export default CustomDrawer;
