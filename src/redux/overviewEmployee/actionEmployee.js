import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, put, del } from '../../_services/apiRequest';
import { successToast, errorToast } from '../../commons/toast';

export const dashboardEmployeeRequest = createAsyncThunk('getEmployee', async (filter, { rejectWithValue }) => {
	try {
		const search = typeof filter === 'string' ? filter : '';
		const res = await get(`users/data/dashboard${search}`);
		return res.data.data_user;
	} catch (error) {
		return rejectWithValue(error?.response?.data);
	}
});

export const addEmployeeRequest = createAsyncThunk('addEmployee', async (data, { rejectWithValue }) => {
	try {
		const res = await post('users/create', data);
		successToast('Tạo thành viên mới thành công');
		return res.data;
	} catch (error) {
		errorToast(error?.response?.data?.message);
		return rejectWithValue(error?.response?.data);
	}
});

export const editEmployeeRequest = createAsyncThunk('updateEmployee', async (data, { rejectWithValue }) => {
	try {
		const res = await put(`users/${data?.result.id_system}`, data?.result);
		successToast('Cập nhật thành công');
		if (res) {
			successToast('Cập nhật thành công');
			res.data_user = data?.result;
			res.index = data?.index;
		}
		return res;
	} catch (error) {
		errorToast('Cập nhật thất bại');
		return rejectWithValue(error?.response?.result);
	}
});

export const deleteEmployeeRequest = createAsyncThunk('deleteEmployee', async (data, { rejectWithValue }) => {
	try {
		const res = await del(`users/${data.id}`);
		successToast('Xóa thành viên thành công');
		if (res) {
			res.index = data?.index;
		}
		return res;
	} catch (error) {
		errorToast('Xóa thành viên thất bại');
		return rejectWithValue(error?.response?.result);
	}
});

export const getEmployeeRequest = createAsyncThunk('getDataEmployee', async (data, { rejectWithValue }) => {
	try {
		const res = await get(`users/${data.id}`);
		return res;
	} catch (error) {
		return rejectWithValue(error?.response?.data);
	}
});
