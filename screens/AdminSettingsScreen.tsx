import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../App';
import { useTheme } from '../context/ThemeContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AdminSettingsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('adminToken');
              navigation.reset({
                index: 0,
                routes: [{ name: 'UserLogin' }],
              });
            } catch (error) {
              console.error('Error during logout:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Define styles based on the current theme
  const screenStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#f5f5f5' : '#121212',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      padding: 16,
      backgroundColor: theme === 'light' ? '#fff' : '#1e1e1e',
      borderBottomWidth: 1,
      borderBottomColor: theme === 'light' ? '#eee' : '#333',
      color: theme === 'light' ? '#333' : '#fff',
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme === 'light' ? '#fff' : '#1e1e1e',
      padding: 16,
      borderBottomWidth: 1,
      borderColor: theme === 'light' ? '#eee' : '#333',
    },
    settingText: {
      flex: 1,
      fontSize: 16,
      color: theme === 'light' ? '#333' : '#fff',
      marginLeft: 12,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme === 'light' ? '#fff' : '#1e1e1e',
      padding: 16,
      marginTop: 16,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme === 'light' ? '#eee' : '#333',
    },
    logoutText: {
      color: '#FF3B30',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 12,
    },
  });

  return (
    <ScrollView style={screenStyles.container}>
      <Text style={screenStyles.title}>Settings</Text>
      
      <View style={screenStyles.settingItem}> {/* Use View for the item containing switch */}
         <Ionicons name="color-palette-outline" size={24} color={theme === 'light' ? '#333' : '#fff'} />
         <Text style={screenStyles.settingText}>Dark Mode</Text>
         <Switch
           value={theme === 'dark'}
           onValueChange={toggleTheme}
           trackColor={{ false: '#767577', true: '#81b0ff' }}
           thumbColor={theme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
         />
      </View>

      <TouchableOpacity
        style={screenStyles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
        <Text style={screenStyles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Base styles (can be overridden by theme-specific styles)
});

export default AdminSettingsScreen; 