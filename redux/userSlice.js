import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: {
            
        }
    }
});

export const selectUser = state => state.data;

export default userSlice.reducer;