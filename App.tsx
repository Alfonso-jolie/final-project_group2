import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import DiaryScreen from './screens/DiaryScreen';
import ProgressScreen from './screens/ProgressScreen';
import MoreScreen from './screens/MoreScreen';
import { FitnessProvider } from './context/FitnessContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FitnessProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: { backgroundColor: '#23263A', borderTopColor: '#23263A' },
            tabBarActiveTintColor: '#4FC3F7',
            tabBarInactiveTintColor: '#aaa',
            tabBarIcon: ({ color, size }) => {
              let iconName = 'home';
              if (route.name === 'Home') iconName = 'home';
              else if (route.name === 'Diary') iconName = 'book';
              else if (route.name === 'Progress') iconName = 'bar-chart-outline';
              else if (route.name === 'More') iconName = 'ellipsis-horizontal-outline';
              return <Ionicons name={iconName as any} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Diary" component={DiaryScreen} />
          <Tab.Screen name="Progress" component={ProgressScreen} />
          <Tab.Screen name="More" component={MoreScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </FitnessProvider>
  );
}
