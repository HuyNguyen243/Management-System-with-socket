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

export const kpiYearOfMonth = createAsyncThunk(
    'getKpiYearOfMonth',
    async (data, { rejectWithValue }) => {
        try {
            let url;
            if(data){
                url = `performance/kpi${data}`
            }else{
                url = `performance/kpi`
            }
            const res = await get(url)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)