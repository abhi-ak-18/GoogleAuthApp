import {View, Text} from 'react-native';
import React from 'react';
import {_getFromAsyncStorage} from './AsyncStorage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Loader = ({navigation}) => {
  setTimeout(() => {
    checkUser();
  }, 1000);

  async function checkUser() {
    const value = await _getFromAsyncStorage('user');
    const parsedValue = JSON.parse(value);
    if (!value) {
      navigation.replace('SignInScreen');
    } else {
      // console.log("the value is" ,JSON.parse(value));
      // console.log(parsedValue.user.name,parsedValue.user.photo,parsedValue.user.email )
      GoogleSignin.configure({
            scopes: ['profile', 'email'],
            webClientId: '694952024951-s9gtu0ce8n82qqlmfb9ib1ctbrarlvdh.apps.googleusercontent.comm',
            offlineAccess: true,
        });
      navigation.replace('Home', {
        name: parsedValue.user.name,
        imageUrl: parsedValue.user.photo,
      });
    }
  }
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <Text style={{color: 'black'}}>Loading . . .</Text>
    </View>
  );
};

export default Loader;

