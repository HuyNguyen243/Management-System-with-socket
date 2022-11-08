import {  createAsyncThunk } from '@reduxjs/toolkit'
import { get, post, put, del } from "../../_services/apiRequest"

export const saleCustomerRequest = createAsyncThunk(
    'Customers',
    async (filter,{ rejectWithValue }) => {
        try {
            const search = typeof filter === 'string' ? filter : ""
            const res = await get(`customers${search}`)
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

export const deleteCustomerRequest = createAsyncThunk(
    'deleteCustomer',
    async (data,{ rejectWithValue }) => {
        try {
            let res = await del(`customers/${data?.id}`)
            if(res){
                res.index = data?.index
            }
            return res;
        } catch (error) {
            return rejectWithValue(error?.response)
        }
    }
)