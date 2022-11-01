import { createSlice } from '@reduxjs/toolkit'

import { dashboardRequest } from './action';

const initialState = {
    dashboard: {
        loading: false,
        data : null,
        error: false,
    }
}
const dashBoardReducer = createSlice({
    name: 'dashboard',
    initialState,
    extraReducers:{
    [dashboardRequest.pending]: (state) => {
        state.dashboard.loading = true;
    },
    [dashboardRequest.fulfilled]: (state, action) => {
        if(!action.payload.status){
            state.dashboard.error = true;
        }
        state.dashboard.loading = false;
        state.dashboard.data = action.payload;
    },
    }
})

export default dashBoardReducer.reducer