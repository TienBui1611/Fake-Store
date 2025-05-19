// src/screens/auth/SignUpScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { Input, Button, Icon } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, clearError } from '../../redux/authSlice';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    const resultAction = await dispatch(signUp({ name, email, password }));
    
    if (signUp.fulfilled.match(resultAction)) {
      // Navigate to main app after successful sign up
      navigation.replace('MainTabs');
    } else if (resultAction.payload) {
      Alert.alert('Sign Up Failed', resultAction.payload);
    }
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    dispatch(clearError());
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign up a new user</Text>
      
      <Input
        placeholder="Name"
        leftIcon={<Icon name="person" type="material" color="#007bff" />}
        value={name}
        onChangeText={setName}
      />
      
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
          title="Sign Up"
          buttonStyle={styles.button}
          loading={loading}
          onPress={handleSignUp}
          icon={<Icon name="person-add" color="white" />}
        />
      </View>
      
      <TouchableOpacity 
        style={styles.switchContainer}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.switchText}>
          Switch to: sign in with an existing user
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

export default SignUpScreen;