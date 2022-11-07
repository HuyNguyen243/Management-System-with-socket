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
        loading: false,
        data : null,
        error: false,
    },
    userByToken: null
}
const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers:{
        profileUserByToken: (state,action)=>{
            Object.assign(state,{},{
                userByToken: action.payload
            })
        }
    },
    extraReducers:{
        [userloginRequest.pending]: (state) => {
            Object.assign(state,{},{
                token: {
                    loading : true
                }
            })
        },
        [userloginRequest.fulfilled]: (state, action) => {
            Object.assign(state,{},{
                token:{
                    isAuth : true,
                    loading : false,
                    error : false,
                    data : action.payload,
                }
            })
        },
        [userloginRequest.rejected]: (state) => {
            Object.assign(state,{},{
                token: {
                    isAuth : false,
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
                window.location.href = "/login"
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
            Object.assign(state,{},{
                user:{
                    loading : true
                }
            })
        },
        [userProfile.fulfilled]: (state,action) => {
            Object.assign(state,{},{
                user: {
                    loading : false,
                    error : false,
                    data : action.payload?.data,
                }
            })
        },
        [userProfile.rejected]: (state) => {
            Object.assign(state.user,{},{
                loading : false,
                error : true,
                data : null,
            })
        },
    }
})
export const { profileUserByToken } = userReducer.actions

export default userReducer.reducer