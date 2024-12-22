import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View, StyleSheet, ToastAndroid} from 'react-native';
import {authCurrentUser, refreshToken} from '../services/api';
import BottomTabNavigator from './tabnavigator';

const Stack = createStackNavigator();

const StackNavigator = ({navigation}: any) => {
  const [initialRoute, setInitialRoute] = useState<string | undefined>(
    undefined,
  );

  const checkAuth = async () => {
    try {
      let accessToken: any = await AsyncStorage.getItem('access_token');

      if (!accessToken) {
        navigation.replace('Login');
      }
      let response = await authCurrentUser(accessToken);

      if (!response) {
        // refreshAuthToken();
      } else {
        console.log('Token not yet expired');
        setInitialRoute('Bottom');
      }
    } catch (error: any) {
      console.log('error', error);
      if (error.message === 'Token Expired!') {
        refreshAuthToken();
        ToastAndroid.show(
          `${error.message} Refreshing it...`,
          ToastAndroid.SHORT,
        );
      } else {
        setInitialRoute('Login');
      }
    }
  };

  const refreshAuthToken = async () => {
    try {
      setInitialRoute('Bottom');
      let refresh_token: any = await AsyncStorage.getItem('refresh_token');

      let response = await refreshToken(refresh_token);
      if (response) {
        await AsyncStorage.setItem('access_token', response.accessToken);
        await AsyncStorage.setItem('refresh_token', response.refreshToken);
      }
    } catch (error: any) {
      console.log('error', error);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };
  useEffect(() => {
    // checkAuth();

    const setInitialRouteName = async () => {
      try {
        let access_token: any = await AsyncStorage.getItem('access_token');

        if (access_token) {
          checkAuth();
        } else if (!access_token || access_token === null) {
          setInitialRoute('Login');
        }
      } catch (error) {
        console.error('Error fetching userData:', error);
        setInitialRoute('Login'); // Fallback in case of error
      }
    };

    setInitialRouteName();
  }, []);

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
