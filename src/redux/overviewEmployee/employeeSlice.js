import { createSlice } from "@reduxjs/toolkit";

import {
    dashboardEmployeeRequest,
    addEmployeeRequest,
    editEmployeeRequest,
    deleteEmployeeRequest,
    getEmployeeRequest,
} from "./actionEmployee";

const initialState = {
    dashboard: {
        loading: false,
        data: null,
        error: false,
    },
    user: {
        loading: false,
        data: null,
        error: false,
    },
    edituser: {
        loading: false,
        data: null,
        error: false,
    },
    deleteuser: {
        loading: false,
        data: null,
        error: false,
    },
    inforuser: {
        loading: false,
        data: null,
        error: false,
    },
};
const employeeReducer = createSlice({
    name: "dashboard",
    initialState,
    extraReducers: {
        [dashboardEmployeeRequest.pending]: (state) => {
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
        [dashboardEmployeeRequest.fulfilled]: (state, action) => {
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
        [dashboardEmployeeRequest.rejected]: (state, action) => {
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
        [addEmployeeRequest.pending]: (state) => {
            Object.assign(
                state,
                {},
                {
                    user: {
                        loading: true,
                    },
                }
            );
        },
        [addEmployeeRequest.fulfilled]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    user: {
                        loading: false,
                        data: action?.payload,
                        error: false,
                    },
                }
            );
            state.dashboard.data.push(action?.payload);
        },
        [addEmployeeRequest.rejected]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    user: {
                        loading: false,
                        data: action?.payload,
                        error: true,
                    },
                }
            );
        },
        [editEmployeeRequest.pending]: (state) => {
            Object.assign(
                state,
                {},
                {
                    edituser: {
                        loading: true,
                    },
                }
            );
        },
        [editEmployeeRequest.fulfilled]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    edituser: {
                        loading: false,
                        data: action?.payload?.data,
                        error: false,
                    },
                }
            );
            state.dashboard.data.splice(
                action?.payload?.index,
                1,
                action?.payload?.data
            );
        },
        [editEmployeeRequest.rejected]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    edituser: {
                        loading: false,
                        data: null,
                        error: true,
                    },
                }
            );
        },
        [deleteEmployeeRequest.pending]: (state) => {
            Object.assign(
                state,
                {},
                {
                    deleteuser: {
                        loading: true,
                    },
                }
            );
        },
        [deleteEmployeeRequest.fulfilled]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    deleteuser: {
                        loading: false,
                        data: action?.payload?.data,
                        error: false,
                    },
                }
            );
            state.dashboard.data.splice(action?.payload?.index, 1);
        },
        [deleteEmployeeRequest.rejected]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    deleteuser: {
                        loading: false,
                        data: null,
                        error: true,
                    },
                }
            );
        },
        [getEmployeeRequest.pending]: (state) => {
            Object.assign(
                state,
                {},
                {
                    inforuser: {
                        loading: true,
                    },
                }
            );
        },
        [getEmployeeRequest.fulfilled]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    inforuser: {
                        loading: false,
                        data: action?.payload?.data,
                        error: false,
                    },
                }
            );
        },
        [getEmployeeRequest.rejected]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    inforuser: {
                        loading: false,
                        data: action?.payload,
                        error: true,
                    },
                }
            );
        },
    },
});

export default employeeReducer.reducer;
