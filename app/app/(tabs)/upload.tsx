import React from 'react';
import { View, StyleSheet } from 'react-native';
import UploadMainScreen from '@/screens/UploadMainScreen';

export default function UploadScreen() {
  return (
    <View style={styles.container}>
      <UploadMainScreen />
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
