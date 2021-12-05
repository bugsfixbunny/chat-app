import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import ChatMainScreen from '../screens/chatScreens/ChatMainScreen';
import ChatSearchFriendScreen from '../screens/chatScreens/ChatSearchFriendScreen';

const Tab = createBottomTabNavigator();

export default function ChatTabs() {
    return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'ChatMainScreen') {
                    iconName = focused
                    ? 'chatbubble-ellipses-sharp'
                    : 'chatbubble-ellipses-outline';
                } else if (route.name === 'ChatSearchFriendScreen') {
                    iconName = focused
                    ? 'search-sharp'
                    : 'search-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#5d3fd3',
            tabBarInactiveTintColor: 'grey',
            tabBarShowLabel: false,
            headerShown: false
        })}
    >
        <Tab.Screen name="ChatMainScreen" component={ChatMainScreen} />
        <Tab.Screen name="ChatSearchFriendScreen" component={ChatSearchFriendScreen} />
    </Tab.Navigator>
    );
}