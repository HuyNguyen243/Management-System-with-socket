import {  createAsyncThunk } from '@reduxjs/toolkit'
import { get,put } from "../../_services/apiRequest"


export const settingRequest = createAsyncThunk(
    'getSystem',
    async (data,{ rejectWithValue }) => {
        try {
            const res = await get(`setting/`)
            return res;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const updateRequest = createAsyncThunk(
    'updateSystem',
    async (data,{ rejectWithValue }) => {
        try {
            const res = await put(`setting/${data?.result?.id_system}`,data?.result)
            return res;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)