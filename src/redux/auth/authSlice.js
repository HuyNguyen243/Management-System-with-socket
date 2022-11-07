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
        loading: false,
        data : token || null,
        error: false,
    },
    user:{
        isAuth: token.access_token ? true : false,
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
            Object.assign(state,{},{
                token: {
                    loading : true
                }
            })
        },
        [userloginRequest.fulfilled]: (state, action) => {
            Object.assign(state.token,{},{
                token:{
                    loading : false,
                    error : false,
                    data : action.payload,
                }
            })
        },
        [userloginRequest.rejected]: (state, action) => {
            Object.assign(state,{},{
                token: {
                    loading : false,
                    error : true,
                    data : null,
                }
            })
        },

        [userLogoutRequest.pending]: (state) => {
            Object.assign(state,{},{
                token:{
                    loading : true
                }
            })
        },
        
        [userLogoutRequest.fulfilled]: (state,action) => {
                storage.delete(NAME_SESSION_STORAGE_TOKEN)
                Object.assign(state,{},{
                    token: {
                        loading : false,
                        isAuth: false,
                        error : false,
                        data : null,
                    }
                })
        },
        [userLogoutRequest.rejected]: (state) => {
            storage.delete(NAME_SESSION_STORAGE_TOKEN)
            Object.assign(state,{},{
                token: {
                    loading : false,
                    isAuth: false,
                    error : false,
                    data : state.token.data
                }
            })
        },

        [userProfile.pending]: (state) => {
            Object.assign(state.user,{},{
                loading : true
            })
        },
        [userProfile.fulfilled]: (state,action) => {
            Object.assign(state.user,{},{
                loading : false,
                isAuth: true,
                error : false,
                data : action.payload?.data,
            })
        },
        [userProfile.fulfilled]: (state,action) => {
            Object.assign(state.user,{},{
                loading : false,
                isAuth: true,
                error : false,
                data : action.payload?.data,
            })
        },
        [userProfile.rejected]: (state,action) => {
            Object.assign(state.user,{},{
                loading : false,
                isAuth: false,
                error : true,
                data : null,
            })
        },
    }
})

export default userReducer.reducer