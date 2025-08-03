import React from "react";
import { View, StyleSheet } from "react-native";

import HomeMainScreen from '@/screens/HomeMainScreen';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <HomeMainScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
