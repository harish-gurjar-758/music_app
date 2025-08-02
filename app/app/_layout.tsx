import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync(); // prevent auto-hide at launch

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const scheme = useColorScheme();

  useEffect(() => {
    const prepare = async () => {
      try {
        // Simulate loading tasks (e.g., fonts, auth, etc)
        await new Promise(resolve => setTimeout(resolve, 1500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, []);

  if (!appIsReady) {
    return null; // Can show custom splash or loader here if desired
  }

  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}