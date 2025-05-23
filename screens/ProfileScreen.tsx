import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../App';
import { useTheme } from '../context/ThemeContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ProfileData {
  name: string;
  age: string;
  email: string;
  phone: string;
  height: string;
  weight: string;
}

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    age: '',
    email: '',
    phone: '',
    height: '',
    weight: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (savedProfile) {
        setProfileData(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const saveProfileData = async () => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    }
  };

  const handleSave = () => {
    // Basic validation
    if (!profileData.name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }
    if (!profileData.email.trim()) {
      Alert.alert('Error', 'Email is required');
      return;
    }
    if (profileData.age && (isNaN(Number(profileData.age)) || Number(profileData.age) <= 0)) {
      Alert.alert('Error', 'Please enter a valid age');
      return;
    }
    saveProfileData();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#f5f5f5' : '#121212',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      paddingTop: 24,
      backgroundColor: theme === 'light' ? '#fff' : '#1e1e1e',
      borderBottomWidth: 1,
      borderBottomColor: theme === 'light' ? '#eee' : '#333',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme === 'light' ? '#333' : '#fff',
      marginLeft: 16,
    },
    content: {
      padding: 16,
    },
    section: {
      backgroundColor: theme === 'light' ? '#fff' : '#1e1e1e',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme === 'light' ? '#333' : '#fff',
      marginBottom: 16,
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      color: theme === 'light' ? '#666' : '#aaa',
      marginBottom: 8,
    },
    input: {
      backgroundColor: theme === 'light' ? '#f5f5f5' : '#2c2c2e',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: theme === 'light' ? '#333' : '#fff',
      borderWidth: 1,
      borderColor: theme === 'light' ? '#ddd' : '#444',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 16,
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      marginLeft: 12,
    },
    cancelButton: {
      backgroundColor: theme === 'light' ? '#f5f5f5' : '#2c2c2e',
    },
    saveButton: {
      backgroundColor: '#007AFF',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    cancelButtonText: {
      color: theme === 'light' ? '#666' : '#aaa',
    },
    saveButtonText: {
      color: '#fff',
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('UserTabs')}
          style={{ padding: 10, paddingTop: 14 }}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme === 'light' ? '#333' : '#fff'}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={profileData.name}
              onChangeText={(text) => setProfileData({ ...profileData, name: text })}
              placeholder="Enter your name"
              placeholderTextColor={theme === 'light' ? '#999' : '#666'}
              editable={isEditing}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={profileData.age}
              onChangeText={(text) => setProfileData({ ...profileData, age: text })}
              placeholder="Enter your age"
              placeholderTextColor={theme === 'light' ? '#999' : '#666'}
              keyboardType="numeric"
              editable={isEditing}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={profileData.email}
              onChangeText={(text) => setProfileData({ ...profileData, email: text })}
              placeholder="Enter your email"
              placeholderTextColor={theme === 'light' ? '#999' : '#666'}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={isEditing}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={profileData.phone}
              onChangeText={(text) => setProfileData({ ...profileData, phone: text })}
              placeholder="Enter your phone number"
              placeholderTextColor={theme === 'light' ? '#999' : '#666'}
              keyboardType="phone-pad"
              editable={isEditing}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Physical Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              value={profileData.height}
              onChangeText={(text) => setProfileData({ ...profileData, height: text })}
              placeholder="Enter your height"
              placeholderTextColor={theme === 'light' ? '#999' : '#666'}
              keyboardType="numeric"
              editable={isEditing}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              value={profileData.weight}
              onChangeText={(text) => setProfileData({ ...profileData, weight: text })}
              placeholder="Enter your weight"
              placeholderTextColor={theme === 'light' ? '#999' : '#666'}
              keyboardType="numeric"
              editable={isEditing}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setIsEditing(false);
                  loadProfileData(); // Reload original data
                }}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={() => setIsEditing(true)}
            >
              <Text style={[styles.buttonText, styles.saveButtonText]}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen; 