import { createAsyncThunk } from '@reduxjs/toolkit';
import { post, put, del } from '../../_services/apiRequest';
import { successToast, errorToast } from '../../commons/toast';

export const createGroupMsgRequest = createAsyncThunk('createGroup', async (data, { rejectWithValue }) => {
	try {
		const res = await post(`group`, data);
		successToast('Tạo nhóm thành công');
		return res?.data;
	} catch (error) {
		errorToast('Tạo nhóm thất bại');
		return rejectWithValue(error?.response?.data);
	}
});

export const updateGroupMsgRequest = createAsyncThunk('updateGroup', async (data, { rejectWithValue }) => {
	try {
		await put(`group/${data.id}`, data.data);
		successToast('Cập nhật thành công');
		return data.data;
	} catch (error) {
		errorToast('Cập nhật thất bại');
		return rejectWithValue(error?.response?.data);
	}
});

export const deleteGroupMsgRequest = createAsyncThunk('deleteGroup', async (id, { rejectWithValue }) => {
	try {
		await del(`group/${id}`);
		return true;
	} catch (error) {
		return rejectWithValue(error?.response?.data);
	}
});

export const postImagesMessage = createAsyncThunk('postImageMessage', async (data, { rejectWithValue }) => {
	try {
		const res = await post(`group/images`, data);
		return res?.data;
	} catch (error) {
		return rejectWithValue(error?.response?.data);
	}
});
