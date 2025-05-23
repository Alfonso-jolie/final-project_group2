import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../App';
import { useTheme } from '../context/ThemeContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MoreScreen = () => {
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
              await AsyncStorage.removeItem('userToken');
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
    section: {
      marginTop: 20,
      backgroundColor: theme === 'light' ? '#fff' : '#1e1e1e',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme === 'light' ? '#eee' : '#333',
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme === 'light' ? '#666' : '#aaa',
      marginLeft: 16,
      marginTop: 16,
      marginBottom: 8,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme === 'light' ? '#eee' : '#333',
    },
    menuText: {
      flex: 1,
      fontSize: 16,
      color: theme === 'light' ? '#333' : '#fff',
      marginLeft: 12,
    },
    logoutButton: {
      borderBottomWidth: 0,
    },
    logoutText: {
      color: '#FF3B30',
    },
  });

  return (
    <ScrollView style={screenStyles.container}>
      <View style={screenStyles.section}>
        <Text style={screenStyles.sectionTitle}>Account</Text>
        <TouchableOpacity 
          style={screenStyles.menuItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-outline" size={24} color={theme === 'light' ? '#333' : '#fff'} />
          <Text style={screenStyles.menuText}>Profile</Text>
          <Ionicons name="chevron-forward" size={24} color={theme === 'light' ? '#ccc' : '#555'} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={screenStyles.menuItem}
          onPress={() => Alert.alert('Coming Soon', 'Notifications feature will be available soon!')}
        >
          <Ionicons name="notifications-outline" size={24} color={theme === 'light' ? '#333' : '#fff'} />
          <Text style={screenStyles.menuText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={24} color={theme === 'light' ? '#ccc' : '#555'} />
        </TouchableOpacity>
      </View>

      <View style={screenStyles.section}>
        <Text style={screenStyles.sectionTitle}>Support</Text>
        <TouchableOpacity 
          style={screenStyles.menuItem}
          onPress={() => Alert.alert('Coming Soon', 'Help Center will be available soon!')}
        >
          <Ionicons name="help-circle-outline" size={24} color={theme === 'light' ? '#333' : '#fff'} />
          <Text style={screenStyles.menuText}>Help Center</Text>
          <Ionicons name="chevron-forward" size={24} color={theme === 'light' ? '#ccc' : '#555'} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={screenStyles.menuItem}
          onPress={() => navigation.navigate('UserChat')}
        >
          <Ionicons name="chatbubble-outline" size={24} color={theme === 'light' ? '#333' : '#fff'} />
          <Text style={screenStyles.menuText}>Contact Support</Text>
          <Ionicons name="chevron-forward" size={24} color={theme === 'light' ? '#ccc' : '#555'} />
        </TouchableOpacity>
      </View>

      <View style={screenStyles.section}>
        <Text style={screenStyles.sectionTitle}>Other</Text>
        <TouchableOpacity 
          style={screenStyles.menuItem}
          onPress={toggleTheme}
        >
          <Ionicons name="color-palette-outline" size={24} color={theme === 'light' ? '#333' : '#fff'} />
          <Text style={screenStyles.menuText}>Dark Mode</Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={theme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={screenStyles.menuItem}
          onPress={() => Alert.alert('Coming Soon', 'Settings feature will be available soon!')}
        >
          <Ionicons name="settings-outline" size={24} color={theme === 'light' ? '#333' : '#fff'} />
          <Text style={screenStyles.menuText}>Settings</Text>
          <Ionicons name="chevron-forward" size={24} color={theme === 'light' ? '#ccc' : '#555'} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[screenStyles.menuItem, screenStyles.logoutButton]} 
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={[screenStyles.menuText, screenStyles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Base styles (can be overridden by theme-specific styles)
});

export default MoreScreen; 