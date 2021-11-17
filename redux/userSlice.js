import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFetch, ip, postFetch, promise } from '../utils/Utilyties';

export const getUser = createAsyncThunk('user/getUser', async () => {
    const response = await getFetch(`${ip}/users/user-data`);
    return promise(response);
});

export const loginUser = createAsyncThunk('user/loginUser', async body => {
    const response = await postFetch(`${ip}/users/login`, body);
    return promise(response);
});

export const registerUser = createAsyncThunk('user/registerUser', async body  => {
    const response = await postFetch(`${ip}/users/register`, body);
    return promise(response);
})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: {},
        isLoggedIn: 'idle',
        validToken: '',
        registrationRejectionMessage: null,
        isLoading: true,
        loginRejectionMessage: null
    },
    reducers: {
        clearMessageError: state => {
            state.registrationRejectionMessage = null;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(getUser.fulfilled, (state, action) => {
            const { data, valid_token } = action.payload;
            state.isLoading = false;
            state.isLoggedIn = true;
            state.data = data;
            state.validToken = valid_token;
        })
        .addCase(getUser.rejected, state => {
            state.isLoading = false;
            state.isLoggedIn = false;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            const { data, valid_token } = action.payload;
            state.isLoggedIn = true;
            state.data = data;
            state.validToken = valid_token;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.registrationRejectionMessage = action.error.message;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            const { data, valid_token } = action.payload;
            state.isLoggedIn = true;
            state.data = data;
            state.validToken = valid_token;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loginRejectionMessage = action.error.message;
        })
    }
});

export const { clearMessageError } = userSlice.actions;

export const selectUserData = state => state.user.data;
export const selectIsLoading = state => state.user.isLoading;
export const selectLoggedIn = state => state.user.isLoggedIn;
export const selectValidToken = state => state.user.validToken;
export const selectLoginErrorMessage = state => state.user.loginRejectionMessage;
export const selectRegistrationErrorMessage = state => state.user.registrationRejectionMessage;

export default userSlice.reducer;