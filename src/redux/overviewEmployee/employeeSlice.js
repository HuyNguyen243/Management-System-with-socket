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
        state.dashboard.loading = true;
    },
    [dashboardEmployeeRequest.fulfilled]: (state, action) => {
        if(!action.payload.status){
            state.dashboard.error = true;
        }
        state.dashboard.loading = false;
        state.dashboard.data = action.payload;
    },
    }
})

export default dashBoardEmployeeReducer.reducer