import { createSlice } from '@reduxjs/toolkit'

import { dashboardJobsRequest } from './actionJobs';

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
    edituser: {
        loading: false,
        data : null,
        error: false,
    },
    deleteuser: {
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
        }

    }
})

export default jobsReducer.reducer