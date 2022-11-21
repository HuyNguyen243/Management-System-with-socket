import { createSlice } from '@reduxjs/toolkit';
import { 
    createGroupMsgRequest,
    updateGroupMsgRequest,
    deleteGroupMsgRequest,
 } from './action';

const initialState = {
    currentUser: null,
    curentRoom: null,
    isOpenChat: false,
    createGroupMsg: {
        isLoading: false,
        data: null,
        error: false
    },
    updateGroupMsg: {
        isLoading: false,
        data: null,
        error: false
    },
    deleteGroupMsg: {
        isLoading: false,
        data: null,
        error: false
    },
    allGroups: null,
    allMembers: null,
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers : {
        getCurrentUser: (state, { payload })=>{
            Object.assign(state,{},{
                currentUser : payload
            })
        },
        getCurrentRoom: (state, { payload })=>{
            Object.assign(state,{},{
                curentRoom : payload
            })
        },
        setIsOpenChat: (state, { payload })=>{
            state.isOpenChat = payload
        },
        getAllgroups: (state, { payload })=>{
            state.allGroups = payload
        },
        getAllMembers: (state, { payload })=>{
            state.allMembers = payload
        }
    },
    extraReducers:{
        [createGroupMsgRequest.pending]: (state) => {
            Object.assign(state,{},{
                createGroupMsg:{
                    loading: true
                }
            })
        },
        [createGroupMsgRequest.fulfilled]: (state, action) => {
            Object.assign(state,{},{
                createGroupMsg:{
                    loading: false,
                    data: action.payload,
                    error: false
                }
            })
        },
        [createGroupMsgRequest.rejected]: (state, action) => {
            Object.assign(state,{},{
                createGroupMsg:{
                    loading: false,
                    data: null,
                    error: true
                }
            })
        },

        [updateGroupMsgRequest.pending]: (state) => {
            Object.assign(state,{},{
                updateGroupMsg:{
                    loading: true
                }
            })
        },
        [updateGroupMsgRequest.fulfilled]: (state, action) => {
            Object.assign(state,{},{
                updateGroupMsg:{
                    loading: false,
                    data: action.payload,
                    error: false
                }
            })
        },
        [updateGroupMsgRequest.rejected]: (state) => {
            Object.assign(state,{},{
                updateGroupMsg:{
                    loading: false,
                    data: null,
                    error: true
                }
            })
        },

        [deleteGroupMsgRequest.pending]: (state) => {
            Object.assign(state,{},{
                deleteGroupMsg:{
                    loading: true
                }
            })
        },
        [deleteGroupMsgRequest.fulfilled]: (state, action) => {
            Object.assign(state,{},{
                deleteGroupMsg:{
                    loading: false,
                    data: action.payload,
                    error: false
                }
            })
        },
        [deleteGroupMsgRequest.rejected]: (state) => {
            Object.assign(state,{},{
                deleteGroupMsg:{
                    loading: false,
                    data: null,
                    error: true
                }
            })
        },
    }
})

export const { getCurrentUser, getCurrentRoom , setIsOpenChat, getAllgroups, getAllMembers } = messagesSlice.actions
export default messagesSlice.reducer
