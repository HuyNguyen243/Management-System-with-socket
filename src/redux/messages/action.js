import {  createAsyncThunk } from '@reduxjs/toolkit'
import { post , put, del } from "../../_services/apiRequest"


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

export const updateGroupMsgRequest = createAsyncThunk(
    'updateGroup',
    async (data,{ rejectWithValue }) => {
        try {
            await put(`group/${data.id}`,data.data)
            return data.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const deleteGroupMsgRequest = createAsyncThunk(
    'deleteGroup',
    async (id,{ rejectWithValue }) => {
        try {
            await del(`group/${id}`)
            return true;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)