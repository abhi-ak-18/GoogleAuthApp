import { StyleSheet, Text, View, Button, Image } from 'react-native';
import React from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Home = ({ route, navigation }) => {
  const { name, imageUrl } = route.params;

  const handleLogout = async () => {
    try {
      await GoogleSignin.signOut();
      navigation.navigate('SignInScreen');
      console.log('Logged out successfully');
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {name}!</Text>
      <View style={styles.profileContainer}>
        <Image source={{ uri: imageUrl }} style={styles.profileImage} />
        <Text style={styles.nameText}>Hello, {name}!</Text>
      </View>
      <Button title="Logout" onPress={handleLogout} />
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
    marginBottom: 20,
    color: '#333',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 18,
    color: '#555',
  },
});

export default Home;
