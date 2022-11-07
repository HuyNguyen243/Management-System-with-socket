import {  createAsyncThunk } from '@reduxjs/toolkit'
import { get, post, put } from "../../_services/apiRequest"

export const saleCustomerRequest = createAsyncThunk(
    'Customers',
    async (data,{ rejectWithValue }) => {
        try {
            const res = await get("customers")       
            return res;
        } catch (error) {
            return rejectWithValue(error?.response);
        }
    }
)

export const addCustomerRequest = createAsyncThunk(
    'Customer',
    async (data,{ rejectWithValue }) => {
        try {
            const res = await post("customers",data)
            return res;
        } catch (error) {
            return rejectWithValue(error?.response)
        }
    }
)

export const editCustomerRequest = createAsyncThunk(
    'editCustomer',
    async (data,{ rejectWithValue }) => {
        try {
            let res = await put(`customers/${data?.result?.id_system}`,data?.data)
            if(res){
                res.data = data?.result
                res.index = data?.index
            }
            return res;
        } catch (error) {
            return rejectWithValue(error?.response)
        }
    }
)
