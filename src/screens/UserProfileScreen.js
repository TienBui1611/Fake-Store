// src/screens/UserProfileScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, Modal } from 'react-native';
import { Button, Card, Icon } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, signOut } from '../redux/authSlice';
import { Input } from '@rneui/themed';

const UserProfileScreen = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.auth);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleUpdate = async () => {
    if (!newName && !newPassword) {
      Alert.alert('Error', 'Please provide at least one field to update');
      return;
    }

    const resultAction = await dispatch(updateProfile({
      name: newName || user.name,
      password: newPassword || ''
    }));

    if (updateProfile.fulfilled.match(resultAction)) {
      Alert.alert('Success', 'Your profile has been updated');
      setModalVisible(false);
      setNewName('');
      setNewPassword('');
    } else if (resultAction.payload) {
      Alert.alert('Update Failed', resultAction.payload);
    }
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>User Profile</Card.Title>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>User Name:</Text>
          <Text style={styles.info}>{user?.name}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{user?.email}</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Update"
            icon={<Icon name="edit" color="white" />}
            buttonStyle={[styles.button, styles.updateButton]}
            onPress={() => setModalVisible(true)}
          />
          
          <Button
            title="Sign Out"
            icon={<Icon name="logout" color="white" />}
            buttonStyle={[styles.button, styles.signOutButton]}
            onPress={handleSignOut}
          />
        </View>
      </Card>

      {/* Update Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <Card containerStyle={styles.modalCard}>
            <Card.Title style={styles.modalTitle}>Update Profile</Card.Title>
            
            <Input
              placeholder="New User Name"
              leftIcon={<Icon name="person" type="material" color="#007bff" />}
              value={newName}
              onChangeText={setNewName}
              defaultValue={user?.name}
            />
            
            <Input
              placeholder="New Password"
              leftIcon={<Icon name="lock" type="material" color="#007bff" />}
              rightIcon={
                <Icon 
                  name={secureTextEntry ? "visibility-off" : "visibility"} 
                  type="material" 
                  color="#007bff"
                  onPress={toggleSecureEntry}
                />
              }
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={secureTextEntry}
            />
            
            <View style={styles.modalButtonContainer}>
              <Button
                title="Cancel"
                type="outline"
                buttonStyle={styles.modalButton}
                onPress={() => setModalVisible(false)}
              />
              
              <Button
                title="Confirm"
                loading={loading}
                buttonStyle={styles.modalButton}
                onPress={handleUpdate}
              />
            </View>
          </Card>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f5f5f5',
  },
  card: {
    borderRadius: 10,
    padding: 15,
  },
  cardTitle: {
    fontSize: 24,
    color: '#007bff',
  },
  infoContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: 'grey',
  },
  info: {
    fontSize: 18,
    color: '#333',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  updateButton: {
    backgroundColor: '#28a745',
  },
  signOutButton: {
    backgroundColor: '#dc3545',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    borderRadius: 10,
    padding: 15,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    color: '#007bff',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    paddingHorizontal: 30,
    borderRadius: 30,
  },
});

export default UserProfileScreen;