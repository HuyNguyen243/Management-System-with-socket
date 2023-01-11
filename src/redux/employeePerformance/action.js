import {  createAsyncThunk } from '@reduxjs/toolkit'
import { get } from "../../_services/apiRequest"


export const getEmployeePerformance = createAsyncThunk(
    'getEmployeePerformance',
    async (data, { rejectWithValue }) => {
        try {
            let url = "performance/employee"
            if(data){
                url = `performance/employee${data}`
            }
            const res = await get(url)
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

export const jobsStaffSaler = createAsyncThunk(
    'jobsStaffSaler',
    async (data, { rejectWithValue }) => {
        try {
            let url;
            if(data){
                url = `performance/staffSaler${data}`
            }else{
                url = `performance/staffSaler`
            }
            const res = await get(url)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const jobsStaffEditor = createAsyncThunk(
    'jobsStaffEditor',
    async (data, { rejectWithValue }) => {
        try {
            let url;
            if(data){
                url = `performance/staffEditor${data}`
            }else{
                url = `performance/staffEditor`
            }
            const res = await get(url)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)