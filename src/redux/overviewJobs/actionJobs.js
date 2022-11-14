import {  createAsyncThunk } from '@reduxjs/toolkit'
import { get,post,put,del } from "../../_services/apiRequest"


export const dashboardJobsRequest = createAsyncThunk(
    'jobs',
    async (data,{ rejectWithValue }) => {
        try {
            const res = await get("users/data/dashboard")
            return res.data.data_user;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)
