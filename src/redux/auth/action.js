import {  createAsyncThunk } from '@reduxjs/toolkit'
import { post,get } from "../../_services/apiRequest"


export const userloginRequest = createAsyncThunk(
    'user_login',
    async (data) => {
        try {
            const res = await post("auth/login",data)
            return res.data;
        } catch (error) {
            return error?.response?.data;
        }
    }
)

export const userLogoutRequest = createAsyncThunk(
    'user_logout',
    async () => {
        try {
            const res = await post("auth/logout")
            return res.data;
        } catch (error) {
            return error?.response?.data;
        }
    }
)

export const userProfile = createAsyncThunk(
    'userProfile',
    async (id) => {
        try {
            const res = await get(`users/infor/${id}`)
            return res;
        } catch (error) {
            return error?.response?.data;
        }
    }
)