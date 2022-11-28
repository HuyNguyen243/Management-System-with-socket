import {  createAsyncThunk } from '@reduxjs/toolkit';
import { post } from "../../_services/apiRequest";

export const createNotification = createAsyncThunk(
    'createNotification',
    async (data,{ rejectWithValue }) => {
        try {
            const res = await post(`notification`,data)
            return res?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)