import React from 'react';
import { Image } from 'expo-image';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://via.placeholder.com/120' }}
                style={styles.avatar}
            />
            <Text style={styles.name}>Harish Gurjar</Text>
            <Text style={styles.email}>harish@example.com</Text>
            <Text style={styles.bio}>
                Software Developer at Hold On Software Tech 🚀
            </Text>
            <Image
                source={require('../../assets/images/splash.gif')}
                contentFit="contain"
            />
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
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 12,
    },
    bio: {
        fontSize: 14,
        color: '#444',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});
