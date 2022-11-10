import {  createAsyncThunk } from '@reduxjs/toolkit'
import { get,post,put } from "../../_services/apiRequest"


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

export const addEmployeeRequest = createAsyncThunk(
    'addEmployee',
    async (data,{ rejectWithValue }) => {
        try {
            const res = await post("users/create",data)
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const editEmployeeRequest = createAsyncThunk(
    'addEmployee',
    async (result,{ rejectWithValue }) => {
        try {
            console.log(result);
            // const res = await put("/infor/update/",result)
            // return res;
        } catch (error) {
            return rejectWithValue(error?.response?.result);
        }
    }
)