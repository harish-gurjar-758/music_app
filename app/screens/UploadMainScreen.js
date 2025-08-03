import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { uploadMusicApi } from '@/services/api'; // ✅ Use relative import path

export default function UploadMainScreen() {
  const [title, setTitle] = useState('');
  const [musicFile, setMusicFile] = useState(null);

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const file = result.assets[0];
        setMusicFile(file);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to pick audio file.');
      console.error('DocumentPicker Error:', err);
    }
  };

  const handleSubmit = async () => {
    if (!title || !musicFile) {
      Alert.alert('Missing Information', 'Please provide both title and audio file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('music', {
      uri: musicFile.uri,
      type: musicFile.mimeType || 'audio/mpeg', // fallback if undefined
    });

    try {
      const response = await uploadMusicApi(formData);

      if (response?.success) {
        Alert.alert('Success', 'Music uploaded successfully!');
        setTitle('');
        setMusicFile(null);
      } else {
        Alert.alert('Upload Failed', response?.error || 'Unknown error');
      }
    } catch (err) {
      Alert.alert('Error', 'Upload failed.');
      console.error('Upload Error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Music</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter song title"
        value={title}
        onChangeText={setTitle}
      />

      {musicFile && <Text style={styles.fileText}>🎵 {musicFile.name}</Text>}

      <TouchableOpacity style={styles.uploadButton} onPress={handleFilePick}>
        <Text style={styles.uploadButtonText}>Select Audio File</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.uploadButton, { marginTop: 16 }]}
        onPress={handleSubmit}
      >
        <Text style={styles.uploadButtonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  fileText: {
    marginBottom: 12,
    color: '#444',
  },
  uploadButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
