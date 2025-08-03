import { getAllMusicsApi } from '@/services/api';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Audio } from 'expo-av';

export default function HomeMainScreen() {
  const [musicData, setMusicData] = useState([]);
  const [currentSound, setCurrentSound] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const response = await getAllMusicsApi();
        setMusicData(response.data); // assuming response.data is an array of songs
      } catch (error) {
        console.error('Error fetching music:', error);
      }
    };

    fetchMusicData();

    return () => {
      if (currentSound) {
        currentSound.unloadAsync(); // Cleanup on unmount
      }
    };
  }, []);

  const playAudio = async (item) => {
    if (currentSound) {
      await currentSound.unloadAsync();
      setCurrentSound(null);
      setPlayingId(null);
    }

    const { sound } = await Audio.Sound.createAsync({ uri: item.musicUrl });
    setCurrentSound(sound);
    setPlayingId(item._id);
    await sound.playAsync();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🎵 Your Songs</Text>

      <FlatList
        data={musicData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.songCard} onPress={() => playAudio(item)}>
            <Text style={styles.songTitle}>{item.title}</Text>
            <Text style={styles.playText}>{playingId === item._id ? '⏸️ Playing' : '▶️ Tap to Play'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  songCard: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    marginBottom: 12,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  playText: {
    marginTop: 4,
    color: '#888',
  },
});
