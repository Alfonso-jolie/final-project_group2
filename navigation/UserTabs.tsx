import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import DiaryScreen from '../screens/DiaryScreen';
import ProgressScreen from '../screens/ProgressScreen';
import MoreScreen from '../screens/MoreScreen';

const Tab = createBottomTabNavigator();

const UserTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Diary') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Progress') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'More') {
            iconName = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
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
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Diary" 
        component={DiaryScreen}
        options={{
          title: 'Diary',
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Progress" 
        component={ProgressScreen}
        options={{
          title: 'Progress',
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="More" 
        component={MoreScreen}
        options={{
          title: 'More',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default UserTabs; 