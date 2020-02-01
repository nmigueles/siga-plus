import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = props => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen</Text>

    <TouchableOpacity onPress={() => props.navigation.navigate('Details')}>
      <Text>Go to Details Screen</Text>
    </TouchableOpacity>

    <Button
      title="Update the title"
      onPress={() => props.navigation.setParams({ otherParam: 'Updated!' })}
    />
  </View>
);

HomeScreen.propTypes = {
  navigation: PropTypes.any,
};

HomeScreen.navigationOptions = () => ({
  title: 'SIGA',
});

export default HomeScreen;
