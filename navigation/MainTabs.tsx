import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AdminMessagesScreen from '../screens/AdminMessagesScreen';
import AdminSettingsScreen from '../screens/AdminSettingsScreen';

// Placeholder screens - you can replace these with your actual screens
const HomeScreen = () => null;
const ProfileScreen = () => null;
const SettingsScreen = () => null;

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Messages') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'home';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        gestureEnabled: false,
        swipeEnabled: false,
      })}
    >
      <Tab.Screen 
        name="Messages" 
        component={AdminMessagesScreen}
        options={{
          title: 'Messages',
          headerShown: true,
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={AdminSettingsScreen}
        options={{
          title: 'Settings',
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs; 