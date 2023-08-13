import React, { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const SignInWithGoogle = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const signInWithGoogle = async () => {
    try {
      GoogleSignin.configure({
        offlineAccess: false,
        forceCodeForRefreshToken: true,
        webClientId:
          '694952024951-s9gtu0ce8n82qqlmfb9ib1ctbrarlvdh.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      await GoogleSignin.hasPlayServices();
      const { idToken, user } = await GoogleSignin.signIn();

      const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredentials);

      return user; // Returning the user information after successful sign-in
    } catch (error) {
      console.log('Google Sign In Error:', error);
      setErrorMessage('Failed to sign in with Google.');
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <TouchableOpacity style={styles.signInButton} onPress={signInWithGoogle}>
        <Text style={styles.signInButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
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
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignInWithGoogle;
