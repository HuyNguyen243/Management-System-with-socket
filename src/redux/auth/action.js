import {  createAsyncThunk } from '@reduxjs/toolkit'
import { post, get, del, put } from "../../_services/apiRequest"
import { storage } from '../../_services/sesionStorage';
import { Cookie } from '../../commons/cookie';
import { NAME_SESSION_STORAGE_TOKEN, ROOM_SESSION_MESSAGES } from '../../constants';

export const userloginRequest = createAsyncThunk(
    'user_login',
    async (req,{ rejectWithValue }) => {
        try {
            const res = await post("auth/login",req.data)
            storage.save(NAME_SESSION_STORAGE_TOKEN,res?.data?.access_token)
            if(req?.checked){
                Cookie.set(res?.data?.access_token)
            }
            window.location.href = "/"
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
            Cookie.delete()
            setTimeout(() => {
                storage.delete(NAME_SESSION_STORAGE_TOKEN)
                storage.delete(ROOM_SESSION_MESSAGES)
                storage.delete("birth")
            },300)
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
            storage.save("birth",res?.data?.births)
            return res;
        } catch (error) {
            storage.delete(NAME_SESSION_STORAGE_TOKEN)
            storage.delete("birth")
            Cookie.delete()
            return rejectWithValue(error?.response?.data);
        }
    }
)


export const userEditProfile = createAsyncThunk(
    'userEditProfile',
    async (result,{ rejectWithValue }) => {
        try {
            const res = await put(`users/infor/update/${result.id}`,result.data)
            storage.save("birth",res?.data?.births)
            return res;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const userChangeStatus = createAsyncThunk(
    'changeStatus',
    async (result,{ rejectWithValue }) => {
        try {
            await put(`infor/status/${result.id}?status=${result.status}`)
            return result.newUser;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)