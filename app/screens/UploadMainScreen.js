import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker'; // ✅ Expo-specific
import { uploadMusicApi } from '@/services/api'; // ⛔ Replace '@/services' with relative path

export default function UploadMainScreen() {
  const [title, setTitle] = useState('');
  const [musicFile, setMusicFile] = useState(null);

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
      });

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setMusicFile(file);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to pick file.');
    }
  };

  const handleSubmit = async () => {
    if (!title || !musicFile) {
      Alert.alert('Missing info', 'Please enter a title and select a music file.');
      return;
    }

    const formData = new FormData();

    formData.append('title', title);
    formData.append('music', {
      uri: musicFile.uri,
      name: musicFile.name,
      type: musicFile.mimeType || 'audio/mpeg', // fallback
    });

    try {
      const response = await uploadMusicApi(formData);
      if (response.success) {
        Alert.alert('Success', 'Music uploaded!');
        setTitle('');
        setMusicFile(null);
      } else {
        Alert.alert('Upload Failed', 'Server responded with failure.');
      }
    } catch (err) {
      Alert.alert('Error', 'Upload failed.');
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

      {musicFile && <Text style={styles.fileText}>{musicFile.name}</Text>}

      <TouchableOpacity style={styles.uploadButton} onPress={handleFilePick}>
        <Text style={styles.uploadButtonText}>Select Music File</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.uploadButton, { marginTop: 16 }]} onPress={handleSubmit}>
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
