import { StyleSheet, Text, View, Button, Image, FlatList, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage'

const windowWidth = Dimensions.get('window').width;

const Home = ({ route, navigation }) => {
  const { name, imageUrl } = route.params;
  const [data, setData] = useState([]);

  const url = 'https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp&access_token=IGQVJYRmpWcC1kUVVvNzVjVzFoa0NkaTRtaHl0ZAlFSUExvUzlVZAFprblY0UGNsUXA3dXVSQ1luY00tTnFtcGtWbTA5d1FhVHllOHZAvVkVSZA2VXeHNaYnVRUjlmOW5vU2lneDFSWVRB';

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((error) => console.error(error))
  }, []);

  const handleLogout = async () => {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('user');
      navigation.replace('SignInScreen');
      console.log('Logged out successfully');
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  const renderPostItem = ({ item }) => (
    <Image source={{ uri: item.media_url }} style={styles.postImage} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {name}!</Text>
      <View style={styles.profileContainer}>
        <Image source={{ uri: imageUrl }} style={styles.profileImage} />
        <Text style={styles.nameText}>Hello, {name}!</Text>
      </View>
      <Button title="Logout" onPress={handleLogout} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderPostItem}
        contentContainerStyle={styles.flatListContainer}
        numColumns={3}
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
  flatListContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  postImage: {
    width: windowWidth / 3 - 20, // Adjusted width calculation
    height: windowWidth / 3 - 20, // Adjusted height calculation
    margin: 5,
    resizeMode: 'cover',
  },
});

export default Home;
