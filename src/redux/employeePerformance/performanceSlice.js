import { createSlice } from "@reduxjs/toolkit";

import {
    getEmployeePerformance,
    kpiYearOfMonth,
} from "./action";

const initialState = {
    employeePerformance: {
        loading: false,
        data: null,
        error: false,
    },
    kpis: {
        loading: false,
        data: null,
        error: false,
    },
};
const employeePerformanceReducer = createSlice({
    name: "employeePerformance",
    initialState,
    reducers:{
        resetKpis: (state) => {
            state.employeePerformance.data = null;
        },
    },
    extraReducers: {
        [getEmployeePerformance.pending]: (state) => {
            Object.assign(
                state,
                {},
                {
                    employeePerformance: {
                        loading: true,
                    },
                }
            );
        },
        [getEmployeePerformance.fulfilled]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    employeePerformance: {
                        loading: false,
                        data: action.payload,
                        error: false,
                    },
                }
            );
        },
        [getEmployeePerformance.rejected]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    employeePerformance: {
                        loading: false,
                        data: null,
                        error: true,
                    },
                }
            );
        },

        [kpiYearOfMonth.pending]: (state) => {
            Object.assign(
                state,
                {},
                {
                    kpis: {
                        loading: true,
                    },
                }
            );
        },
        [kpiYearOfMonth.fulfilled]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    kpis: {
                        loading: false,
                        data: action.payload,
                        error: false,
                    },
                }
            );
        },
        [kpiYearOfMonth.rejected]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    kpis: {
                        loading: false,
                        data: null,
                        error: true,
                    },
                }
            );
        },
    },
});

export const {
    resetKpis,
} = employeePerformanceReducer.actions;

export default employeePerformanceReducer.reducer;
