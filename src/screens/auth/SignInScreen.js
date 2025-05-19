// src/screens/auth/SignInScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { Input, Button, Icon } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, clearError } from '../../redux/authSlice';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    const resultAction = await dispatch(signIn({ email, password }));
    
    if (signIn.fulfilled.match(resultAction)) {
      // Navigate to main app after successful login
      navigation.replace('MainTabs');
    } else if (resultAction.payload) {
      Alert.alert('Sign In Failed', resultAction.payload);
    }
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
    dispatch(clearError());
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign in with your email and password</Text>
      
      <Input
        placeholder="Email"
        leftIcon={<Icon name="email" type="material" color="#007bff" />}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <Input
        placeholder="Password"
        leftIcon={<Icon name="lock" type="material" color="#007bff" />}
        rightIcon={
          <TouchableOpacity onPress={toggleSecureEntry}>
            <Icon 
              name={secureTextEntry ? "visibility-off" : "visibility"} 
              type="material" 
              color="#007bff" 
            />
          </TouchableOpacity>
        }
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secureTextEntry}
      />
      
      <View style={styles.buttonContainer}>
        <Button
          title="Clear"
          type="outline"
          buttonStyle={styles.button}
          onPress={clearForm}
          icon={<Icon name="clear" color="#007bff" />}
        />
        
        <Button
          title="Sign In"
          buttonStyle={styles.button}
          loading={loading}
          onPress={handleSignIn}
          icon={<Icon name="login" color="white" />}
        />
      </View>
      
      <TouchableOpacity 
        style={styles.switchContainer}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.switchText}>
          Switch to: sign up a new user
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4d4d4d',
    marginBottom: 30,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  switchContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  switchText: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default SignInScreen;