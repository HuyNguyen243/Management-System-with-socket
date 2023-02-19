import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, put } from '../../_services/apiRequest';
import { successToast, errorToast } from '../../commons/toast';

export const settingRequest = createAsyncThunk('getSystem', async (data, { rejectWithValue }) => {
	try {
		const res = await get(`setting/`);
		return res;
	} catch (error) {
		return rejectWithValue(error?.response?.data);
	}
});

export const updateRequest = createAsyncThunk('updateSystem', async (data, { rejectWithValue }) => {
	try {
		const res = await put(`setting/${data?.result?.id_system}`, data?.result);
		successToast('Cập nhật thành công');
		return res;
	} catch (error) {
		errorToast('Cập nhật thất bại');
		return rejectWithValue(error?.response?.data);
	}
});
