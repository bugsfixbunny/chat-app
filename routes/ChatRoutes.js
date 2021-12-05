import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatTabs from './ChatTabs';
import ChatSingleFriendScreen from '../screens/chatScreens/ChatSingleFriendScreen';
import ChatProfilePhoto from '../screens/chatScreens/ChatProfilePhoto';
import { useDispatch } from 'react-redux';
import { connectToSocket, socket } from '../redux/messagesSlice';
import { newMessageIncoming } from '../redux/messagesSlice';
import { newMessage } from '../redux/friendsSlice';

const Stack = createNativeStackNavigator();

export default function ChatRoutes() {

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            if(!socket){
               await dispatch(connectToSocket());
            }
            await incomingEvents();
        })();
    }, []);

    const incomingEvents = async () => {
        socket.on('private message', async data => {
            const message = data.data;
            dispatch(newMessageIncoming(message));
            dispatch(newMessage(message));
        });
        socket.on('disconnect', () => {
            socket.connect();
        });
    }

    return (
        <Stack.Navigator
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen
                name='ChatTabs'
                component={ChatTabs}
            />
            <Stack.Screen
                name='ChatSingleFriendScreen'
                component={ChatSingleFriendScreen}
            />
            <Stack.Screen
                name='ChatProfilePhoto'
                component={ChatProfilePhoto}
            />
        </Stack.Navigator>
    );
}