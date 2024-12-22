import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Inonicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

import {loginUser} from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from '../../context/ThemeContext';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {theme} = useContext(ThemeContext);

  const onLogin = async () => {
    try {
      if (!email) {
        ToastAndroid.show('Please enter email', ToastAndroid.SHORT);
      } else if (!password) {
        ToastAndroid.show('Please enter password', ToastAndroid.SHORT);
      } else {
        let response: any = await loginUser(
          email.toLowerCase().trim(),
          password.toLowerCase().trim(),
        );

        if (response) {
          ToastAndroid.show('Login successful', ToastAndroid.SHORT);
          navigation.replace('Bottom');
          await AsyncStorage.setItem('userData', JSON.stringify(response));
          await AsyncStorage.setItem('access_token', response.accessToken);
          await AsyncStorage.setItem('refresh_token', response.refreshToken);
        }
      }
    } catch (error: any) {
      console.log('error', error);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View style={styles.mainView}>
        <View style={styles.inputView}>
          <MaterialIcons name="email" size={24} color={theme.textColor} />
          <TextInput
            style={{flex: 1, color: theme.textColor}}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputView}>
          <Inonicons name="eye" size={24} color={theme.textColor} />
          <TextInput
            style={{flex: 1, color: theme.textColor}}
            value={password}
            placeholder="Password"
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.buttonContainer} onPress={onLogin}>
          <Text style={styles.buttonText}>{'Login'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
