import { createSlice } from '@reduxjs/toolkit'
import {
    userloginRequest ,
    userLogoutRequest,
} from './action'

import { storage } from '../../_services/sesionStorage';

const token = {access_token: storage.get("1touch_access_token")}

const initialState = {
    user: {
        isAuth: token.access_token ? true : false,
        loading: false,
        data : token || null,
        error: false,
    },
}
const userReducer = createSlice({
    name: 'user',
    initialState,
    extraReducers:{
        [userloginRequest.pending]: (state) => {
            state.user.loading = true;
        },
        [userloginRequest.fulfilled]: (state, action) => {
            state.user.isAuth = action.payload.status;
            state.user.error = action.payload.status;
            state.user.loading = false;
            state.user.data = action.payload;
        },
        [userLogoutRequest.pending]: (state) => {
            state.user.loading = false;
        },
        [userLogoutRequest.fulfilled]: (state,action) => {
            console.log(action)
                state.user.isAuth = false;
                state.user.error = action.payload.status;
                state.user.loading = false;
                state.user.data = action.payload.status ? null : state.user.data ;
        },

    }
})

export default userReducer.reducer