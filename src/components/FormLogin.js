import React from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { CustomButton as Ingresar } from './CustomButtom';

const styles = StyleSheet.create({
  container: {
    padding: 40,
    paddingTop: 0,
  },
  input: {
    height: 45,
    paddingLeft: 10,
    backgroundColor: '#FDFCFC',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.22,
    elevation: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default function FormLogin() {
  let secondInput = null;

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Usuario'}
        style={styles.input}
        returnKeyType={'next'}
        onSubmitEditing={() => {
          secondInput.focus();
        }}
        blurOnSubmit={false}
      />
      <TextInput
        name={'pass'}
        placeholder={'Contraseña'}
        style={styles.input}
        ref={input => {
          secondInput = input;
        }}
      />
      <Ingresar title={'Ingresar'} style={{ marginTop: 20 }} />
    </View>
  );
}
