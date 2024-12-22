import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import Icon from 'react-native-vector-icons/Ionicons'; // You can change the icon library

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // Return the appropriate icon
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'orange', // Active tab icon color
        tabBarInactiveTintColor: 'gray', // Inactive tab icon color
        tabBarStyle: {
          backgroundColor: '#fff', // Optional: Customize tab bar background color
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
