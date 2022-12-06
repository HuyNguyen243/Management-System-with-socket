import {  createAsyncThunk } from '@reduxjs/toolkit'
import { get } from "../../_services/apiRequest"


export const getEmployeePerformance = createAsyncThunk(
    'getEmployeePerformance',
    async (data, { rejectWithValue }) => {
        try {
            const res = await get(`performance/employee${data}`)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)
