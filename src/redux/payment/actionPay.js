import {  createAsyncThunk } from '@reduxjs/toolkit'
import { get } from "../../_services/apiRequest"


export const getPayRequest = createAsyncThunk(
    'getJobs',
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
