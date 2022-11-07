import {  createAsyncThunk } from '@reduxjs/toolkit'
import { get } from "../../_services/apiRequest"


export const dashboardEmployeeRequest = createAsyncThunk(
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