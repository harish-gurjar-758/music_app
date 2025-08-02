import React from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ExploreScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Explore Music</ThemedText>
      <Image source="https://cdn-icons-png.flaticon.com/512/727/727245.png" style={styles.image} contentFit="contain" />
      <ThemedText type="default">Discover tracks and artists!</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginVertical: 20,
  },
});