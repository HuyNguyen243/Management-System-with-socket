import {  createAsyncThunk } from '@reduxjs/toolkit'
import { get, put } from "../../_services/apiRequest"


export const getPayRequest = createAsyncThunk(
    'getPays',
    async (data, { rejectWithValue }) => {
        try {
            const search = typeof data[0] === 'string' ?  data[0] : ""
            const res = await get(`pays/${data[1]}${search}`)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const updatePayRequest = createAsyncThunk(
    'updatepays',
    async (data, { rejectWithValue }) => {
        try {
            const res = await put(`pays/${data.id}`,data.data)
            if(res.data){
                return data.result
            }
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const getPayStaffRequest = createAsyncThunk(
    'getPayStaffs',
    async (data, { rejectWithValue }) => {
        try {
            const search = typeof data === 'string' ?  data : ""
            const res = await get(`pays/payment-staff${search}`)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)