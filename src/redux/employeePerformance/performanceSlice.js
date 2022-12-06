import { createSlice } from "@reduxjs/toolkit";

import {
    getEmployeePerformance,
} from "./action";

const initialState = {
    employeePerformance: {
        loading: false,
        data: null,
        error: false,
    }
};
const employeePerformanceReducer = createSlice({
    name: "employeePerformance",
    initialState,
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
    },
});

export default employeePerformanceReducer.reducer;
