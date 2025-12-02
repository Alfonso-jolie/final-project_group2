import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCredentials } from '../types/auth.types';

const USERS_STORAGE_KEY = '@users';
const CURRENT_USER_KEY = '@current_user';

export const storeUser = async (userData: LoginCredentials) => {
  try {
    // Get existing users
    const existingUsersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    const existingUsers = existingUsersJson ? JSON.parse(existingUsersJson) : [];
    
    // Check if user already exists
    const userExists = existingUsers.some((user: LoginCredentials) => user.email === userData.email);
    if (userExists) {
      throw new Error('User already exists');
    }

    // Add new user
    const updatedUsers = [...existingUsers, userData];
    await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    return true;
  } catch (error) {
    console.error('Error storing user:', error);
    throw error;
  }
};

export const validateUser = async (credentials: LoginCredentials) => {
  try {
    const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    if (!usersJson) return false;

    const users = JSON.parse(usersJson);
    const user = users.find(
      (user: LoginCredentials) =>
        user.email === credentials.email && user.password === credentials.password
    );

    if (user) {
      // Store current user
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error validating user:', error);
    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    const userJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  } catch (error) {
    console.error('Error logging out:', error);
  }
}; 