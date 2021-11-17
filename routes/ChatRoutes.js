import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatMainScreen from '../screens/chatScreens/ChatMainScreen';

const Stack = createNativeStackNavigator();

export default function ChatRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen
                name='ChatMainScreen'
                component={ChatMainScreen}
            />
        </Stack.Navigator>
    );
}