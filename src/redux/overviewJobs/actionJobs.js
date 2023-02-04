import {  createAsyncThunk } from '@reduxjs/toolkit'
import { get,post,put,del } from "../../_services/apiRequest"
import { successToast, errorToast } from '../../commons/toast';


export const dashboardJobsRequest = createAsyncThunk(
    'dashboard',
    async (filter,{ rejectWithValue }) => {
        try {
            const search = typeof filter === 'string' ? filter : ""
            const res = await get(`jobs/data/dashboard${search}`)
            return res.data?.data_jobs;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)


export const addJobsRequest = createAsyncThunk(
    'addJobs',
    async (data,{ rejectWithValue }) => {
        try {
            successToast('Tạo công việc mới thành công')
            const res = await post("jobs/",data)
            return res.data;
        } catch (error) {
            errorToast(error?.response?.data?.message)
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const editJobsRequest = createAsyncThunk(
    'updateJobs',
    async (data,{ rejectWithValue }) => {
        try {
            const res = await put(`jobs/${data?.result.id_system}`,data?.result)
            successToast('Cập nhật thành công')
            if(res){
                res.data_user = data?.result
                res.index = data?.index
            }
            return res;
        } catch (error) {
            errorToast(error?.response?.data?.mesage)
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const doneJobsRequest = createAsyncThunk(
    'doneJobs',
    async (data,{ rejectWithValue }) => {
        try {
            const res = await put(`jobs/done/${data?.result.id_system}`,data?.result)
            successToast('Cập nhật thành công')
            if(res){
                res.data_user = data?.result
                res.index = data?.index
            }
            return res;
        } catch (error) {
            errorToast(error?.response?.data?.mesage)

            return rejectWithValue(error?.response?.data);
        }
    }
)

export const deleteJobsRequest = createAsyncThunk(
    'deleteJobs',
    async (data,{ rejectWithValue }) => {
        try {
            successToast('Xóa công việc thành công')
            const res = await del(`jobs/${data.id}`)
            if(res){
                res.index = data?.index
            }
            return res;
        } catch (error) {
            errorToast('Xóa công việc thất bại')
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const getJobsRequest = createAsyncThunk(
    'getDataJobs',
    async (data,{ rejectWithValue }) => {
        try {
            const res = await get(`jobs/${data.id}`)
            return res;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const getJobsAdminRequest = createAsyncThunk(
    'getDataJobs',
    async (data,{ rejectWithValue }) => {
        try {
            const res = await get(`jobs/admin/${data.id}`)
            return res;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)