import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import your screens
import HomeScreen from '@/app/(tabs)';
import UploadScreen from '@/app/(tabs)';
import ProfileScreen from '@/app/(tabs)';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    headerShown: true,
                    tabBarActiveTintColor: '#6200EE',
                    tabBarInactiveTintColor: 'gray',
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = '
                        if (route.name === 'Home') {
                            iconName = focused ? 'musical-notes' : 'musical-notes-outline';
                        } else if (route.name === 'Upload') {
                            iconName = focused ? 'cloud-upload' : 'cloud-upload-outline';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Upload" component={UploadScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
