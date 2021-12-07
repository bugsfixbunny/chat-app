import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { getFetch, ip, promise } from '../utils/Utilyties';
import io from 'socket.io-client';

export const connectToSocket = createAsyncThunk('messages/connectToSocket', async (_, { getState }) => {
    const state = getState();
    const userToken = state.user.validToken;
    socket = await io(ip, {auth: {userToken}, reconnectionDelayMax: 10000});
});

export let socket;

export const getMessages = createAsyncThunk('messages/getMessages', async () => {
    const response = await getFetch(`${ip}/users/messages`);
    return promise(response);
});

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState({
    error: null,
    loading: 'idle',
    socket: {}
});

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        clearMessages: state => {
            state = initialState;
            return state;
        },
        newMessageIncoming: (state, action) => {
            const message = action.payload;
            messagesAdapter.addOne(state, message);
            return state;
        },
        newSocketConnection: (state, action) => {
            const socket = action.payload;
            state.socket = socket;
        },
        seenMessage: (state, action) => {
            messagesAdapter.updateMany(state, action.payload);
        }
    },
    extraReducers(builder) {
        builder
        .addCase(getMessages.fulfilled, (state, action) => {
            messagesAdapter.upsertMany(state, action.payload);
            state.loading = 'loaded';
        })
        .addCase(getMessages.rejected, (state, action) => {
            state.error = action.error.message;
        })
    }
});

export const { clearMessages, newMessageIncoming, newSocketConnection, seenMessage } = messagesSlice.actions;

export const {
    selectAll: selectAllMessages,
    selectById: selectMessageById,
    selectIds: selectMessagesIds
  } = messagesAdapter.getSelectors(state => state.messages);

export const selectMessagesLoaded = state => state.messages.loading;
export const selectSocket = state => state.messages.socket;

export const selectMessagesByIds = (state, ids) => {
    let messages = [];
    for(let i = ids.length - 1; i >= 0; i--){
        const message = selectMessageById(state, ids[i]);
        if (message) {
            messages.push(message);
        }
    }
    return messages;
}

export const selectNotSeenNumber = (state, ids) => {
    let count = 0;
    const currentUserId = state.user.data.id;
    for(let i = 0; i < ids.length; i++) {
        const message = selectMessageById(state, ids[i]);
        if (!(message?.has_seen) && !(message?.owner_id == currentUserId)) {
            count++;
        }
    }
    return count;
} 

export default messagesSlice.reducer;