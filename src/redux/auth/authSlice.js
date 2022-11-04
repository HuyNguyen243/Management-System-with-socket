import { createSlice } from '@reduxjs/toolkit'
import {
    userloginRequest ,
    userLogoutRequest,
    userProfile,
} from './action'
import { NAME_SESSION_STORAGE_TOKEN } from '../../constants';

import { storage } from '../../_services/sesionStorage';

const token = {access_token: storage.get(NAME_SESSION_STORAGE_TOKEN)};

const initialState = {
    token: {
        isAuth: token.access_token ? true : false,
        loading: false,
        data : token || null,
        error: false,
    },
    user:{
        isAuth: false,
        loading: false,
        data : null,
        error: false,
    }
}
const userReducer = createSlice({
    name: 'user',
    initialState,
    extraReducers:{

        [userloginRequest.pending]: (state) => {
            state.token.loading = true;
        },
        [userloginRequest.fulfilled]: (state, action) => {
            state.token.isAuth = action.payload.status;
            state.token.error = action.payload.status;
            state.token.loading = false;
            state.token.data = action.payload;
        },

        [userLogoutRequest.pending]: (state) => {
            state.token.loading = false;
        },
        [userLogoutRequest.fulfilled]: (state,action) => {
                storage.delete(NAME_SESSION_STORAGE_TOKEN)
                state.token.isAuth = false;
                state.token.error = false;
                state.token.loading = false;
                state.token.data = action.payload ? null : state.token.data ;
        },

        [userProfile.pending]: (state) => {
            state.user.loading = true;
        },
        [userProfile.fulfilled]: (state,action) => {
            state.user.isAuth = action.payload.status;
            state.user.error = action.payload.status;
            state.user.loading = false;
            state.user.data = action.payload?.data;
        },
    }
})

export default userReducer.reducer