import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabNavigator from './tabnavigator';
import ProfileScreen from '../screens/Profile';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Tabs"
        component={BottomTabNavigator}
        options={{title: 'Home'}}
      />
      <Drawer.Screen name="Settings" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
