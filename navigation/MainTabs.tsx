import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AdminMessagesScreen from '../screens/AdminMessagesScreen';
import AdminSettingsScreen from '../screens/AdminSettingsScreen';
import { useTheme } from '../context/ThemeContext';

// Placeholder screens - you can replace these with your actual screens
const HomeScreen = () => null;
const ProfileScreen = () => null;
const SettingsScreen = () => null;

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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

          // Determine icon color based on theme and focus state
          const iconColor = focused
            ? '#007AFF' // Active color remains blue
            : isDark
            ? '#666' // Inactive color dark mode
            : 'gray'; // Inactive color light mode

          return <Ionicons name={iconName} size={size} color={iconColor} />;
        },
        tabBarActiveTintColor: '#007AFF', // Keep active color consistent
        tabBarInactiveTintColor: isDark ? '#666' : 'gray', // Apply dark mode inactive color
        tabBarStyle: {
          backgroundColor: isDark ? '#1e1e1e' : '#fff', // Apply dark mode background
          borderTopColor: isDark ? '#333' : '#eee', // Apply dark mode border color
        },
        tabBarLabelStyle: {
          color: isDark ? '#fff' : '#333', // Apply dark mode label color
        },
        headerStyle: {
          backgroundColor: isDark ? '#1e1e1e' : '#fff', // Apply dark mode header background
        },
        headerTintColor: isDark ? '#fff' : '#333', // Apply dark mode header text/icon color
        gestureEnabled: false,
        swipeEnabled: false,
      })}
    >
      <Tab.Screen 
        name="Messages" 
        component={AdminMessagesScreen}
        options={{
          title: 'Messages',
          // header styles are now defined in screenOptions
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={AdminSettingsScreen}
        options={{
          title: 'Settings',
          // header styles are now defined in screenOptions
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs; 