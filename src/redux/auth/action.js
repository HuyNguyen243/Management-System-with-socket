import {  createAsyncThunk } from '@reduxjs/toolkit'
import { post, get, del } from "../../_services/apiRequest"


export const userloginRequest = createAsyncThunk(
    'user_login',
    async (data,{ rejectWithValue }) => {
        try {
            const res = await post("auth/login",data)
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const userLogoutRequest = createAsyncThunk(
    'user_logout',
    async (data,{ rejectWithValue }) => {
        try {
            const res = await del("auth/logout")
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const userProfile = createAsyncThunk(
    'userProfile',
    async (id,{ rejectWithValue }) => {
        try {
            const res = await get(`users/infor/${id}`)
            return res;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)