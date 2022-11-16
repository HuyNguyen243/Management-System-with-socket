import {  createAsyncThunk } from '@reduxjs/toolkit'
import { get,post,put,del } from "../../_services/apiRequest"


export const dashboardJobsRequest = createAsyncThunk(
    'dashboard',
    async (filter,{ rejectWithValue }) => {
        try {
            const search = typeof filter === 'string' ? filter : ""
            const res = await get(`jobs/data/dashboard${search}`)
            return res.data?.data_jobs;
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
