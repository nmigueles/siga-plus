import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StatusBar, AsyncStorage } from 'react-native';
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler';

import Colors from '../constants/colors';
import getPushNotificationToken from '../functions/getPushNotificationToken';
import MessageBox from '../components/MessageBox';

const HomeScreen = ({ navigation }) => {
  StatusBar.setBackgroundColor(Colors.white);

  const [token, setToken] = useState('');

  const signOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };
  const getToken = async () => {
    const newToken = await getPushNotificationToken();
    setToken(newToken);
  };

  return (
    <ScrollView>
      <MessageBox message="App in development." type="info" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput value={token} style={{ fontSize: 10 }} />
        <TouchableOpacity onPress={getToken}>
          <Text>get token</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={signOut}>
          <Text>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.any,
};

export default HomeScreen;
