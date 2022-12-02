import { createSlice } from '@reduxjs/toolkit';
import { createNotification } from './action';

const initialState = {
    notification: {
        isLoading: false,
        data: null,
        error: false
    },
    notifications: [],
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers : {
        getNotifications: (state, { payload })=>{
            Object.assign(state,{},{
                notifications : payload
            })
        },
    },
    extraReducers:{
        [createNotification.pending]: (state) => {
            Object.assign(state,{},{
                notification:{
                    loading: true
                }
            })
        },
        [createNotification.fulfilled]: (state, action) => {
            Object.assign(state,{},{
                notification:{
                    loading: false,
                    data: action.payload,
                    error: false
                }
            })
        },
        [createNotification.rejected]: (state, action) => {
            Object.assign(state,{},{
                notification:{
                    loading: false,
                    data: null,
                    error: true
                }
            })
        },

    }
})
export const { getNotifications } = notificationSlice.actions

export default notificationSlice.reducer
