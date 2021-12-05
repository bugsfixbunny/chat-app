import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import friendsSlice from './friendsSlice';
import messagesSlice from './messagesSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        friends: friendsSlice,
        messages: messagesSlice
    }
});