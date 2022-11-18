import {  createAsyncThunk } from '@reduxjs/toolkit'
import { post } from "../../_services/apiRequest"


export const createGroupMsgRequest = createAsyncThunk(
    'createGroup',
    async (data,{ rejectWithValue }) => {
        try {
            const res = await post(`group`,data)
            return res?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)