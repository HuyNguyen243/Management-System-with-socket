import { createSlice } from "@reduxjs/toolkit";

import {
    getPayRequest,
    updatePayRequest,
    getPayStaffRequest,
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
    },
    getstaff: {
        loading: false,
        data: null,
        error: false,
    }
};
const payReducer = createSlice({
    name: "dashboard",
    initialState,
    reducer:{
        resetPaymentUpdate: (state)=>{
            Object.assign(state,{},{
                updatepay:{
                    loading: false,
                    data : null,
                    error: false,
                },
            })
        },
    },
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
            state?.getstaff?.data?.splice(action?.payload?.index, 1, action.payload.data)
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

        [getPayStaffRequest.pending]: (state) => {
            Object.assign(
                state,
                {},
                {
                    getstaff: {
                        loading: true,
                    },
                }
            );
        },
        [getPayStaffRequest.fulfilled]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    getstaff: {
                        loading: false,
                        data: action.payload,
                        error: false,
                    },
                }
            );
        },
        [getPayStaffRequest.rejected]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    getstaff: {
                        loading: false,
                        data: null,
                        error: true,
                    },
                }
            );
        },
    },
});
export const { resetPaymentUpdate } = payReducer.actions

export default payReducer.reducer;
