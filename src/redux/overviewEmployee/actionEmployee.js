import {  createAsyncThunk } from '@reduxjs/toolkit'
import { get,post,put,del } from "../../_services/apiRequest"


export const dashboardEmployeeRequest = createAsyncThunk(
    'dashboard',
    async (filter,{ rejectWithValue }) => {
        try {
            const search = typeof filter === 'string' ? filter : ""
            const res = await get(`users/data/dashboard/${search}`)
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
    'updateEmployee',
    async (data,{ rejectWithValue }) => {
        try {
            const res = await put(`users/update/${data?.result.id_system}`,data?.result)
            if(res){
                res.data_user = data?.result
                res.index = data?.index
            }
            return res;
        } catch (error) {
            return rejectWithValue(error?.response?.result);
        }
    }
)

export const deleteEmployeeRequest = createAsyncThunk(
    'deleteEmployee',
    async (data,{ rejectWithValue }) => {
        try {
            const res = await del(`users/delete/${data.id}`)
            if(res){
                res.index = data?.index
            }
            return res;
        } catch (error) {
            return rejectWithValue(error?.response?.result);
        }
    }
)