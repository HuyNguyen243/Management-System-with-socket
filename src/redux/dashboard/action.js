import {  createAsyncThunk } from '@reduxjs/toolkit'
import { get } from "../../_services/apiRequest"


export const dashboardRequest = createAsyncThunk(
    'dashboard',
    async () => {
        try {
            const res = await get("customers")
            return res.data;
        } catch (error) {
            return error?.response?.data;
        }
    }
)