import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import SplashScreen from '../screens/SplashScreen';

const RootNavigator = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isReady, setIsReady] = useState(false);

  return (
    <NavigationContainer>
      {!isReady ? (
        <SplashScreen onFinish={() => setIsReady(true)} />
      ) : isAuthenticated ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
