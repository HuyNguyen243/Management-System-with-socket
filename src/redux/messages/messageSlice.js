import { createSlice } from '@reduxjs/toolkit';
import { createGroupMsgRequest } from './action';

const initialState = {
    currentUser: null,
    curentRoom: null,
    isOpenChat: false,
    createGroupMsg: {
        isLoading: false,
        data: null,
        error: false
    }
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
    }
})

export const { getCurrentUser, getCurrentRoom , setIsOpenChat } = messagesSlice.actions
export default messagesSlice.reducer
