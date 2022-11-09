import { createSlice } from '@reduxjs/toolkit'

import { dashboardEmployeeRequest,addEmployeeRequest } from './actionEmployee';

const initialState = {
    dashboard: {
        loading: false,
        data : null,
        error: false,
    },
    user: {
        loading: false,
        data : null,
        error: false,
    },
}
const dashBoardEmployeeReducer = createSlice({
    name: 'dashboard',
    initialState,
    extraReducers:{
        [dashboardEmployeeRequest.pending]: (state) => {
            Object.assign(state,{},{
                dashboard:{
                    loading: true
                }
            })
        },
        [dashboardEmployeeRequest.fulfilled]: (state, action) => {
            Object.assign(state,{},{
                dashboard:{
                    loading: false,
                    data: action.payload,
                    error: false
                }
            })
        },
        [dashboardEmployeeRequest.rejected]: (state, action) => {
            Object.assign(state,{},{
                dashboard:{
                    loading: false,
                    data: null,
                    error: true
                }
            })
        },
        [addEmployeeRequest.pending]: (state) => {
            Object.assign(state,{},{
                user:{
                    loading: true
                }
            })
        },
        [addEmployeeRequest.fulfilled]: (state, action) => {
            console.log(action?.payload);
            Object.assign(state,{},{
                user:{
                    loading: false,
                    data: action?.payload,
                    error: false
                }
            })
            state.dashboard.data.push(action?.payload)
        },
        [addEmployeeRequest.rejected]: (state, action) => {
            Object.assign(state,{},{
                user:{
                    loading: false,
                    data: action?.payload,
                    error: true
                }
            })
        },
    }
})

export default dashBoardEmployeeReducer.reducer