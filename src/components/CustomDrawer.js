import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerNavigatorItems } from 'react-navigation-drawer';

import Colors from '../constants/colors';
import AppLogo from './AppLogo';
import LogoutButton from './LogoutButton';

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
  logoContainer: {
    height: 50,
    paddingBottom: 10,
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
});

const CustomDrawer = props => (
  <View style={styles.drawerContainer}>
    <View style={styles.topDrawer}>
      <View style={styles.logoContainer}>
        <AppLogo size={35} container={{ height: 100 }} />
      </View>
      <Image
        style={styles.userImage}
        source={{ uri: 'https://avatars0.githubusercontent.com/u/35758739' }}
      />
      <Text style={styles.userName}>Nicolás Migueles</Text>
      <Text style={styles.userCarrera}>Ingeniería en Sistemas de la Información</Text>
    </View>
    <DrawerNavigatorItems
      {...props}
      activeBackgroundColor={Colors.grey3}
      activeTintColor={Colors.main}
    />
    <LogoutButton navigation={props.navigation} />
  </View>
);

CustomDrawer.propTypes = {
  navigation: PropTypes.any,
};

export default CustomDrawer;
