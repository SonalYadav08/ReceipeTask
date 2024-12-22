import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View, StyleSheet, ToastAndroid} from 'react-native';
import {authCurrentUser, refreshToken} from '../services/api';
import BottomTabNavigator from './tabnavigator';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<string | undefined>(
    undefined,
  );

  const checkAuth = async () => {
    try {
      let accessToken: any = await AsyncStorage.getItem('access_token');

      let response = await authCurrentUser(accessToken);
      // console.log('auht check re', response);
    } catch (error: any) {
      refreshAuthToken();
      // console.log('error', error);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  const refreshAuthToken = async () => {
    try {
      let refresh_token: any = await AsyncStorage.getItem('refresh_token');
      // console.log(refresh_token);
      let response = await refreshToken(refresh_token);
      await AsyncStorage.setItem('access_token', response.accessToken);
      await AsyncStorage.setItem('refresh_token', response.refreshToken);
    } catch (error: any) {
      console.log('error', error);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };
  useEffect(() => {
    checkAuth();

    const setInitialRouteName = async () => {
      try {
        let userData: any = await AsyncStorage.getItem('access_token');
        console.log('userData:', userData);

        if (userData) {
          setInitialRoute('Bottom');
        } else {
          setInitialRoute('Login');
        }
      } catch (error) {
        console.error('Error fetching userData:', error);
        setInitialRoute('Login'); // Fallback in case of error
      }
    };

    setInitialRouteName();
  }, []);

  // Delay rendering of the navigator until `initialRoute` is set
  if (!initialRoute) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={initialRoute}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Bottom" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StackNavigator;
