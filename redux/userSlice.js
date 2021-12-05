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

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
    const response = await getFetch(`${ip}/users/logout`);
    return promise(response);
});

export const updateProfilePhoto = createAsyncThunk('user/updateProfilePhoto', async body => {
    const response = await postFetch(`${ip}/users/upload-profile-image`, body);
    return promise(response);
});

const initialState = {
    data: {},
    isLoggedIn: 'idle',
    validToken: '',
    registrationRejectionMessage: null,
    isLoading: true,
    loginRejectionMessage: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
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
        .addCase(logoutUser.fulfilled, state => {
            state.isLoggedIn = false;
            state.data = {};
            state.validToken = '';
        })
        .addCase(updateProfilePhoto.fulfilled, (state, action) => {
            const { data } = action.payload;
            state.data.profile_pic = data.profile_pic;
        })
    }
});

export const { clearMessageError } = userSlice.actions;

export const selectUserData = state => state.user.data;
export const selectUserId = state => state.user.data.id;
export const selectUserProfilePic = state => state.user.data.profile_pic;
export const selectIsLoading = state => state.user.isLoading;
export const selectLoggedIn = state => state.user.isLoggedIn;
export const selectValidToken = state => state.user.validToken;
export const selectLoginErrorMessage = state => state.user.loginRejectionMessage;
export const selectRegistrationErrorMessage = state => state.user.registrationRejectionMessage;

export default userSlice.reducer;