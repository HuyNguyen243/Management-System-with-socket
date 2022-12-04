import { createSlice } from "@reduxjs/toolkit";

import {
    getPayRequest,
} from "./actionPay";

const initialState = {
    getpay: {
        loading: false,
        data: null,
        error: false,
    }
};
const payReducer = createSlice({
    name: "dashboard",
    initialState,
    extraReducers: {
        [getPayRequest.pending]: (state) => {
            Object.assign(
                state,
                {},
                {
                    getpay: {
                        loading: true,
                    },
                }
            );
        },
        [getPayRequest.fulfilled]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    getpay: {
                        loading: false,
                        data: action.payload,
                        error: false,
                    },
                }
            );
        },
        [getPayRequest.rejected]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    getpay: {
                        loading: false,
                        data: null,
                        error: true,
                    },
                }
            );
        },
    },
});

export default payReducer.reducer;
