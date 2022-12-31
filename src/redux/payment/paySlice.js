import { createSlice } from "@reduxjs/toolkit";

import {
    getPayRequest,
    updatePayRequest,
} from "./actionPay";

const initialState = {
    getpay: {
        loading: false,
        data: null,
        error: false,
    },
    updatepay: {
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

        [updatePayRequest.pending]: (state) => {
            Object.assign(
                state,
                {},
                {
                    updatepay: {
                        loading: true,
                    },
                }
            );
        },
        [updatePayRequest.fulfilled]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    updatepay: {
                        loading: false,
                        data: action.payload.data,
                        error: false,
                    },
                }
            );
            state.getpay.data.splice(action?.payload?.index, 1, action.payload.data)
        },
        [updatePayRequest.rejected]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    updatepay: {
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
