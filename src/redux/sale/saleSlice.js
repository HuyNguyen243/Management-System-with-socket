import { createSlice } from '@reduxjs/toolkit'

import { 
    saleCustomerRequest,
    addCustomerRequest,
    editCustomerRequest,
 } from './action';

const initialState = {
    customers: {
        loading: false,
        data : null,
        error: false,
    },
    customer:{
        loading: false,
        data : null,
        error: false,
    },
    editcustomer:{
        loading: false,
        data : null,
        error: false,
    },
}
const saleSlice = createSlice({
    name: 'saleSlice',
    initialState,
    extraReducers:{
        [saleCustomerRequest.pending]: (state) => {
            Object.assign(state,{},{
                customers:{
                    loading: true
                }
            })
        },
        [saleCustomerRequest.fulfilled]: (state, action) => {
            Object.assign(state,{},{
                customers:{
                    error: false,
                    data: action.payload.data,
                    loading: false
                }
            })
        },
        [saleCustomerRequest.rejected]: (state, action) => {
            Object.assign(state,{},{
                customers:{
                    error: true,
                    data: null,
                    loading: false
                }
            })
        },
        [addCustomerRequest.pending]: (state) => {
            Object.assign(state,{},{
                customer:{
                    loading: true
                }
            })
        },
        [addCustomerRequest.fulfilled]: (state, action) => {
            const result = action?.payload?.data
            Object.assign(state,{},{
                customer:{
                    error: false,
                    data: result,
                    loading: false
                },
            })
            state.customers.data.push(result)
        },
        [addCustomerRequest.rejected]: (state, action) => {
            Object.assign(state,{},{
                customer:{
                    error: false,
                    data: null,
                    loading: false
                },
            })
        },
        [editCustomerRequest.pending]: (state) => {
            Object.assign(state,{},{
                editcustomer:{
                    loading: true
                }
            })
        },
        [editCustomerRequest.fulfilled]: (state, action) => {
            const result = action?.payload
            Object.assign(state,{},{
                editcustomer:{
                    error: false,
                    data: result?.data,
                    loading: false
                },
            })

            state.customers.data.splice(result?.index, 1, result?.data)
        },
        [editCustomerRequest.rejected]: (state) => {
            Object.assign(state,{},{
                editcustomer:{
                    error: true,
                    data: null,
                    loading: false
                },
            })
        },
    }

})

export default saleSlice.reducer