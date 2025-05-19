// src/screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../redux/authSlice';

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      // Wait for 2 seconds to display splash screen
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check if user is already authenticated
      const resultAction = await dispatch(checkAuth());
      
      if (checkAuth.fulfilled.match(resultAction) && resultAction.payload) {
        // User is authenticated, navigate to main tab navigator
        navigation.replace('MainTabs');
      } else {
        // User is not authenticated, navigate to auth screens
        navigation.replace('Auth');
      }
    };

    checkAuthStatus();
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/fake-store-logo.png')}  // Create this image or use a placeholder
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Fake Store</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4da6ff',
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
});

export default SplashScreen;