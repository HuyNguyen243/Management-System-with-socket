import { createSlice } from '@reduxjs/toolkit'

import { dashboardEmployeeRequest } from './actionEmployee';

const initialState = {
    dashboard: {
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
                    error: false
                }
            })
        },
    }
})

export default dashBoardEmployeeReducer.reducer