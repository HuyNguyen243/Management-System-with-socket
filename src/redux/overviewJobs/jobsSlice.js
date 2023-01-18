import { createSlice } from "@reduxjs/toolkit";

import {
    dashboardJobsRequest,
    addJobsRequest,
    deleteJobsRequest,
    editJobsRequest,
    getJobsRequest,
    getJobsAdminRequest,
    doneJobsRequest
} from "./actionJobs";

const initialState = {
    dashboard: {
        loading: false,
        data: null,
        error: false,
    },
    addjobs: {
        loading: false,
        data: null,
        error: false,
    },
    editjobs: {
        loading: false,
        data: null,
        error: false,
    },
    deletejobs: {
        loading: false,
        data: null,
        error: false,
    },
    getjobs: {
        loading: false,
        data: null,
        error: false,
    },
    donejobs: {
        loading: false,
        data: null,
        error: false,
    }
};
const jobsReducer = createSlice({
    name: "dashboard",
    initialState,
    reducers:{
        resetJobRequest: (state)=>{
            Object.assign(state,{},{
                donejobs:{
                    loading: false,
                    data : null,
                    error: false,
                },
                addjobs: {
                    loading: false,
                    data: null,
                    error: false,
                },
                editjobs: {
                    loading: false,
                    data: null,
                    error: false,
                },
                deletejobs: {
                    loading: false,
                    data: null,
                    error: false,
                },
            })
        },
        resetJobCreated:(state)=>{
            Object.assign(state,{},{
                addjobs:{
                    loading: false,
                    data : null,
                    error: false,
                },
            })
        },
        resetJobdeleted:(state)=>{
            Object.assign(state,{},{
                deletejobs:{
                    loading: false,
                    data : null,
                    error: false,
                },
            })
        }
    },
    extraReducers: {
        [dashboardJobsRequest.pending]: (state) => {
            Object.assign(
                state,
                {},
                {
                    dashboard: {
                        loading: true,
                    },
                }
            );
        },
        [dashboardJobsRequest.fulfilled]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    dashboard: {
                        loading: false,
                        data: action.payload,
                        error: false,
                    },
                }
            );
        },
        [dashboardJobsRequest.rejected]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    dashboard: {
                        loading: false,
                        data: null,
                        error: true,
                    },
                }
            );
        },
        [addJobsRequest.pending]: (state) => {
            Object.assign(
                state,
                {},
                {
                    addjobs: {
                        loading: true,
                    },
                }
            );
        },
        [addJobsRequest.fulfilled]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    addjobs: {
                        loading: false,
                        data: action?.payload,
                        error: false,
                    },
                }
            );
            state.dashboard.data.unshift(action?.payload);
        },
        [addJobsRequest.rejected]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    addjobs: {
                        loading: false,
                        data: action?.payload,
                        error: true,
                    },
                }
            );
        },
        [editJobsRequest.pending]: (state) => {
            Object.assign(state,{},{
                editjobs:{
                    loading: true
                }
            })
        },
        [editJobsRequest.fulfilled]: (state, action) => {
            Object.assign(state,{},{
                editjobs:{
                    loading: false,
                    data: action?.payload?.data,
                    error: false
                }
            })
            state.dashboard.data.splice(action?.payload?.index, 1, action?.payload?.data)
        },
        [editJobsRequest.rejected]: (state, action) => {
            Object.assign(state,{},{
                editjobs:{
                    loading: false,
                    data: action?.payload,
                    error: true
                }
            })
        },
        [deleteJobsRequest.pending]: (state) => {
            Object.assign(
                state,
                {},
                {
                    deletejobs: {
                        loading: true,
                    },
                }
            );
        },
        [deleteJobsRequest.fulfilled]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    deletejobs: {
                        loading: false,
                        data: action?.payload?.data,
                        error: false,
                    },
                }
            );
            state.dashboard.data.splice(action?.payload?.index, 1);
        },
        [deleteJobsRequest.rejected]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    deletejobs: {
                        loading: false,
                        data: null,
                        error: true,
                    },
                }
            );
        },
        [getJobsRequest.pending]: (state) => {
            Object.assign(
                state,
                {},
                {
                    getjobs: {
                        loading: true,
                    },
                }
            );
        },
        [getJobsRequest.fulfilled]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    getjobs: {
                        loading: false,
                        data: action?.payload?.data,
                        error: false,
                    },
                }
            );
        },
        [getJobsRequest.rejected]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    getjobs: {
                        loading: false,
                        data: action?.payload,
                        error: true,
                    },
                }
            );
        },
        [getJobsAdminRequest.pending]: (state) => {
            Object.assign(
                state,
                {},
                {
                    getjobs: {
                        loading: true,
                    },
                }
            );
        },
        [getJobsAdminRequest.fulfilled]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    getjobs: {
                        loading: false,
                        data: action?.payload?.data,
                        error: false,
                    },
                }
            );
        },
        [getJobsAdminRequest.rejected]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    getjobs: {
                        loading: false,
                        data: action?.payload,
                        error: true,
                    },
                }
            );
        },
        [doneJobsRequest.pending]: (state) => {
            Object.assign(state,{},{
                donejobs:{
                    loading: true
                }
            })
        },
        [doneJobsRequest.fulfilled]: (state, action) => {
            Object.assign(state,{},{
                donejobs:{
                    loading: false,
                    data: action?.payload?.data,
                    error: false
                }
            })
            state.dashboard.data.splice(action?.payload?.index, 1, action?.payload?.data)
        },
        [doneJobsRequest.rejected]: (state, action) => {
            Object.assign(state,{},{
                donejobs:{
                    loading: false,
                    data: action?.payload,
                    error: true
                },
                editjobs: {
                    loading: false,
                    data: null,
                    error: false,
                },
            })
        },
    },
});
export const { resetJobRequest, resetJobCreated, resetJobdeleted } = jobsReducer.actions
export default jobsReducer.reducer;
