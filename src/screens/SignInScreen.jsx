import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {_storeIntoAsyncStorage} from '../components/AsyncStorage';

const SignInScreen = ({ navigation }) => {

  const [isSignedIn, setIsSignedIn] = useState(false);

  const googleSignIn = async () => {
    GoogleSignin.configure({
      offlineAccess: true,
      webClientId: '694952024951-s9gtu0ce8n82qqlmfb9ib1ctbrarlvdh.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredentials = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      auth().signInWithCredential(googleCredentials);
      //console.log('UserInfo:', userInfo);
      setIsSignedIn(true);
      console.log('Sign in successful for user:', userInfo.user.email);
      _storeIntoAsyncStorage('user', JSON.stringify(userInfo)); // storing data in to async storage
      navigation.replace('Home', {
        name: userInfo.user.name,
        imageUrl: userInfo.user.photo,
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play services not available or outdated');
      } else {
        console.log('Google Sign In Error: Unknown error');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to G Auth App</Text>
      <Text style={styles.subtitle}>Sign in to get started</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={googleSignIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#555',
  },
});

export default SignInScreen;
