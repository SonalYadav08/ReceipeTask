import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './style';
import {ThemeContext} from '../../context/ThemeContext';

const ProfileScreen = ({navigation}: any) => {
  const [userData, setUserData] = useState<any>();
  const {theme} = useContext(ThemeContext);
  let getUserData = async () => {
    const data: any = await AsyncStorage.getItem('userData');
    let newData = JSON.parse(data);
    setUserData(newData);
  };

  useEffect(() => {
    getUserData();
  });

  const showLogoutAlert = () => {
    Alert.alert(
      'Logout', // Title
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: handleLogout,
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };
  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.replace('Login');
  };
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View style={{}}>
        <View style={styles.profieImgContainer}>
          <Image source={{uri: userData?.image}} style={styles.profileImg} />
        </View>
        <View style={styles.detailView}>
          <Text style={[styles.label, {color: theme.textColor}]}>Name:-</Text>
          <Text style={[styles.data]}>
            {` ${userData?.firstName} ${userData?.lastName}`}
          </Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={showLogoutAlert}>
          <Text style={styles.loginBtnText}>{'Logout'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
