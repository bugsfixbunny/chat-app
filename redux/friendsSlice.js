import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { getFetch, ip, promise } from '../utils/Utilyties';

export const getFriends = createAsyncThunk('friends/getFriends', async () => {
    const response = await getFetch(`${ip}/users/friends`);
    return promise(response);
});

const friendsAdapter = createEntityAdapter();

const initialState = friendsAdapter.getInitialState({
    loading: 'idle',
    error:  null
});

export const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        clearFriends: state => {
            state = initialState;
            return state;
        },
        newMessage: (state, action) => {
            const ownerId = action.payload.owner_id;
            const messageId = action.payload.id;
            const friend = state.entities[ownerId];
            const messagesArray = friend.messages_id;
            messagesArray.push(messageId);
        },
        newMessageMine: (state, action) => {
            const receiverId = action.payload.receiver_id;
            const messageId = action.payload.id;
            const friend = state.entities[receiverId];
            const messagesArray = friend.messages_id;
            messagesArray.push(messageId);
        }
        
    },
    extraReducers(builder) {
        builder
        .addCase(getFriends.fulfilled, (state, action) => {
            friendsAdapter.upsertMany(state, action.payload);
        })
        .addCase(getFriends.rejected, (state, action) => {
            state.error = action.error.message;
        })
    }
});

export const { clearFriends, newMessage, newMessageMine } = friendsSlice.actions;

export const {
    selectAll: selectAllFriends,
    selectById: selectFriendById,
    selectIds: selectFriendsIds
  } = friendsAdapter.getSelectors(state => state.friends);

export default friendsSlice.reducer;