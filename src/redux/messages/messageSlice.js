import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    curentRoom: null,
    isOpenChat: false,
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
    }
})

export const { getCurrentUser, getCurrentRoom , setIsOpenChat } = messagesSlice.actions
export default messagesSlice.reducer
