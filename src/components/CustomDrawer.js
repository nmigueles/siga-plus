import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage } from 'react-native';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { Row } from 'native-base';

import Colors from '../constants/colors';
import CustomButton from './CustomButtom';

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: Colors.main,
    textAlign: 'right',
    paddingBottom: 3,
  },
  topDrawer: {
    padding: 20,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    marginBottom: 15,
  },
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
  row: {
    height: 50,
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
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

const CustomDrawer = props => {
  const logout = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Login');
  };

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.topDrawer}>
        <Row style={styles.row}>
          <Image
            style={styles.userImage}
            source={{ uri: 'https://avatars0.githubusercontent.com/u/35758739' }}
          />
          <Text style={styles.title}>SIGA +</Text>
        </Row>
        <Text style={styles.userName}>Nicolás Migueles</Text>

        <Text style={styles.userCarrera}>Ingeniería en Sistemas de la Información</Text>
      </View>
      <DrawerNavigatorItems
        {...props}
        activeBackgroundColor={Colors.grey}
        activeTintColor={Colors.main}
      />
      <CustomButton
        title="Cerrar Sesión"
        style={styles.logout}
        textStyle={{ color: Colors.main, fontWeight: 'bold' }}
        onPress={logout}
      />
    </View>
  );
};

CustomDrawer.propTypes = {
  navigation: PropTypes.any,
};

export default CustomDrawer;
