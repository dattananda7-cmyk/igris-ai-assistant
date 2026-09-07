import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser, logout } from '../redux/slices/authSlice';
import { colors } from '../theme/colors';

const SplashScreen = ({ onFinish }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check if user is already logged in
        const accessToken = await AsyncStorage.getItem('accessToken');
        const userString = await AsyncStorage.getItem('user');

        if (accessToken && userString) {
          const user = JSON.parse(userString);
          dispatch(setUser({
            user,
            accessToken,
            refreshToken: await AsyncStorage.getItem('refreshToken'),
          }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        dispatch(logout());
      } finally {
        // Simulate loading time
        setTimeout(() => onFinish(), 1000);
      }
    };

    initializeApp();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        {/* IGRIS Logo */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0, 217, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
