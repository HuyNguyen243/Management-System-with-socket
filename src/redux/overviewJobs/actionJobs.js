import {  createAsyncThunk } from '@reduxjs/toolkit'
import { get,post,put,del } from "../../_services/apiRequest"


export const dashboardJobsRequest = createAsyncThunk(
    'dashboard',
    async (data,{ rejectWithValue }) => {
        try {
            const res = await get("users/data/dashboard")
            return res.data.data_user;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)


export const addJobsRequest = createAsyncThunk(
    'addJobs',
    async (data,{ rejectWithValue }) => {
        try {
            const res = await post("jobs/create",data)
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)
