import { createSlice } from "@reduxjs/toolkit";

import {
    saleCustomerRequest,
    addCustomerRequest,
    editCustomerRequest,
    deleteCustomerRequest,
    getCustomerRequest,
} from "./action";

const initialState = {
    customers: {
        loading: false,
        data: null,
        error: false,
    },
    customer: {
        loading: false,
        data: null,
        error: false,
    },
    editcustomer: {
        loading: false,
        data: null,
        error: false,
    },
    deletecustomer: {
        loading: false,
        data: null,
        error: false,
    },
    getcustomer: {
        loading: false,
        data: null,
        error: false,
    },
};
const saleSlice = createSlice({
    name: "saleSlice",
    initialState,
    reducers:{
        resetEditCustomer: (state)=>{
            Object.assign(state,{},{
                editcustomer:{
                    loading: false,
                    data : null,
                    error: false,
                },
                deletecustomer: {
                    loading: false,
                    data: null,
                    error: false,
                }
            })
        },
        resetCreateCustomer: (state)=>{
            Object.assign(state,{},{
                customer:{
                    loading: false,
                    data : null,
                    error: false,
                },
            })
        },
        resetDeleteCustomer: (state)=>{
            Object.assign(state,{},{
                deletecustomer:{
                    loading: false,
                    data : null,
                    error: false,
                },
            })
        },
    },
    extraReducers: {
        [saleCustomerRequest.pending]: (state) => {
            Object.assign(
                state,
                {},
                {
                    customers: {
                        loading: true,
                    },
                }
            );
        },
        [saleCustomerRequest.fulfilled]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    customers: {
                        error: false,
                        data: action.payload.data,
                        loading: false,
                    },
                }
            );
        },
        [saleCustomerRequest.rejected]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    customers: {
                        error: true,
                        data: null,
                        loading: false,
                    },
                }
            );
        },

        [addCustomerRequest.pending]: (state) => {
            Object.assign(
                state,
                {},
                {
                    customer: {
                        loading: true,
                    },
                }
            );
        },
        [addCustomerRequest.fulfilled]: (state, action) => {
            const result = action?.payload?.data;
            Object.assign(
                state,
                {},
                {
                    customer: {
                        error: false,
                        data: result,
                        loading: false,
                    },
                }
            );
            state.customers.data.push(result);
        },
        [addCustomerRequest.rejected]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    customer: {
                        error: false,
                        data: null,
                        loading: false,
                    },
                }
            );
        },

        [editCustomerRequest.pending]: (state) => {
            Object.assign(
                state,
                {},
                {
                    editcustomer: {
                        loading: true,
                    },
                }
            );
        },
        [editCustomerRequest.fulfilled]: (state, action) => {
            const result = action?.payload;
            Object.assign(
                state,
                {},
                {
                    editcustomer: {
                        error: false,
                        data: result?.data,
                        loading: false,
                    },
                }
            );

            state.customers.data.splice(result?.index, 1, result?.data);
        },
        [editCustomerRequest.rejected]: (state) => {
            Object.assign(
                state,
                {},
                {
                    editcustomer: {
                        error: true,
                        data: null,
                        loading: false,
                    },
                }
            );
        },

        [deleteCustomerRequest.pending]: (state) => {
            Object.assign(
                state,
                {},
                {
                    deletecustomer: {
                        loading: true,
                    },
                }
            );
        },
        [deleteCustomerRequest.fulfilled]: (state, action) => {
            const result = action?.payload;
            Object.assign(
                state,
                {},
                {
                    deletecustomer: {
                        error: false,
                        data: result?.data,
                        loading: false,
                    },
                }
            );

            state.customers.data.splice(result?.index, 1);
        },
        [deleteCustomerRequest.rejected]: (state) => {
            Object.assign(
                state,
                {},
                {
                    deletecustomer: {
                        error: true,
                        data: null,
                        loading: false,
                    },
                }
            );
        },
        [getCustomerRequest.pending]: (state) => {
            Object.assign(
                state,
                {},
                {
                    getcustomer: {
                        loading: true,
                    },
                }
            );
        },
        [getCustomerRequest.fulfilled]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    getcustomer: {
                        loading: false,
                        data: action?.payload?.data,
                        error: false,
                    },
                }
            );
        },
        [getCustomerRequest.rejected]: (state, action) => {
            Object.assign(
                state,
                {},
                {
                    getcustomer: {
                        loading: false,
                        data: action?.payload,
                        error: true,
                    },
                }
            );
        },
    },
});
export const { resetEditCustomer, resetCreateCustomer, resetDeleteCustomer } = saleSlice.actions
export default saleSlice.reducer;
