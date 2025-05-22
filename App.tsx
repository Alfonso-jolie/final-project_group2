import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import UserLoginScreen from './screens/UserLoginScreen';
import AdminLoginScreen from './screens/AdminLoginScreen';
import SignupScreen from './screens/SignupScreen';
import { FitnessProvider } from './context/FitnessContext';
import { MessagesProvider } from './context/MessagesContext';
import { ThemeProvider } from './context/ThemeContext';
import { TouchableOpacity } from 'react-native';
import MainTabs from './navigation/MainTabs';
import UserTabs from './navigation/UserTabs';
import UserChatScreen from './screens/UserChatScreen';
import AdminChatScreen from './screens/AdminChatScreen';

export type RootStackParamList = {
  UserLogin: undefined;
  AdminLogin: undefined;
  Signup: undefined;
  MainTabs: undefined;
  UserTabs: undefined;
  UserChat: undefined;
  AdminChat: { userId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <FitnessProvider>
      <MessagesProvider>
        <ThemeProvider>
          <NavigationContainer>
            <Stack.Navigator 
              initialRouteName="UserLogin"
              screenOptions={{
                headerShown: false,
                gestureEnabled: false,
              }}
            >
              <Stack.Screen name="UserLogin" component={UserLoginScreen} options={{ gestureEnabled: false }} />
              <Stack.Screen 
                name="AdminLogin" 
                component={AdminLoginScreen}
                options={{
                  headerShown: true,
                  headerTitle: '',
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen 
                name="Signup" 
                component={SignupScreen}
                options={{
                  headerShown: true,
                  headerTitle: '',
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen name="MainTabs" component={MainTabs} options={{ gestureEnabled: false }} />
              <Stack.Screen name="UserTabs" component={UserTabs} options={{ gestureEnabled: false }} />
              <Stack.Screen 
                name="UserChat" 
                component={UserChatScreen}
                options={({ navigation }) => ({
                  headerShown: true,
                  title: 'Contact Support',
                  headerLeft: () => (
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={{ marginLeft: 10 }}
                    >
                      <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                  ),
                })}
              />
              <Stack.Screen 
                name="AdminChat" 
                component={AdminChatScreen}
                options={{
                  headerShown: true,
                  title: 'Chat', // Will be overridden by the screen title
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </MessagesProvider>
    </FitnessProvider>
  );
}
