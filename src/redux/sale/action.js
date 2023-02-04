import {  createAsyncThunk } from '@reduxjs/toolkit'
import { get, post, put, del } from "../../_services/apiRequest"
import { successToast, errorToast } from '../../commons/toast';

export const saleCustomerRequest = createAsyncThunk(
    'Customers',
    async (filter,{ rejectWithValue }) => {
        try {
            const search = typeof filter === 'string' ? filter : ""
            const res = await get(`customers${search}`)
            return res;
        } catch (error) {
            return rejectWithValue(error?.response);
        }
    }
)

export const addCustomerRequest = createAsyncThunk(
    'Customer',
    async (data,{ rejectWithValue }) => {
        try {
            successToast('Tạo khách hàng mới thành công')
            const res = await post("customers",data)
            return res;
        } catch (error) {
            errorToast('Tạo khách hàng mới thất bại')
            return rejectWithValue(error?.response)
        }
    }
)

export const editCustomerRequest = createAsyncThunk(
    'editCustomer',
    async (data,{ rejectWithValue }) => {
        try {
            let res = await put(`customers/${data?.result?.id_system}`,data?.data)
            successToast('Cập nhật thành công')
            if(res){
                res.data = data?.result
                res.index = data?.index
            }
            return res;
        } catch (error) {
            errorToast('Cập nhật thất bại')

            return rejectWithValue(error?.response)
        }
    }
)

export const deleteCustomerRequest = createAsyncThunk(
    'deleteCustomer',
    async (data,{ rejectWithValue }) => {
        try {
            let res = await del(`customers/${data?.id}`)
            successToast('Xóa khách hàng thành công')
            if(res){
                res.index = data?.index
            }
            return res;
        } catch (error) {
            errorToast('Xóa khách hàng thất bại')
            return rejectWithValue(error?.response)
        }
    }
)

export const getCustomerRequest = createAsyncThunk(
    'getCustomer',
    async (data,{ rejectWithValue }) => {
        try {
            let res = await get(`customers/${data?.id}`)
            return res;
        } catch (error) {
            return rejectWithValue(error?.response)
        }
    }
)