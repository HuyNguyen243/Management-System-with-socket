import { createSlice } from '@reduxjs/toolkit'

import { dashboardJobsRequest,addJobsRequest } from './actionJobs';

const initialState = {
    dashboard: {
        loading: false,
        data : null,
        error: false,
    },
    addjobs: {
        loading: false,
        data : null,
        error: false,
    },
}
const jobsReducer = createSlice({
    name: 'dashboard',
    initialState,
    extraReducers:{
        [dashboardJobsRequest.pending]: (state) => {
            Object.assign(state,{},{
                dashboard:{
                    loading: true
                }
            })
        },
        [dashboardJobsRequest.fulfilled]: (state, action) => {
            Object.assign(state,{},{
                dashboard:{
                    loading: false,
                    data: action.payload,
                    error: false
                }
            })
        },
        [dashboardJobsRequest.rejected]: (state, action) => {
            Object.assign(state,{},{
                dashboard:{
                    loading: false,
                    data: null,
                    error: true
                }
            })
        },
        [addJobsRequest.pending]: (state) => {
            Object.assign(state,{},{
                user:{
                    loading: true
                }
            })
        },
        [addJobsRequest.fulfilled]: (state, action) => {
            Object.assign(state,{},{
                user:{
                    loading: false,
                    data: action?.payload,
                    error: false
                }
            })
            state.dashboard.data.push(action?.payload)
        },
        [addJobsRequest.rejected]: (state, action) => {
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

export default jobsReducer.reducer