import { createAsyncThunk } from '@reduxjs/toolkit';
import { post, get } from '../../_services/apiRequest';

export const createNotification = createAsyncThunk('createNotification', async (data, { rejectWithValue }) => {
	try {
		const res = await post(`notification`, data);
		return res?.data;
	} catch (error) {
		return rejectWithValue(error?.response?.data);
	}
});

export const getNotification = createAsyncThunk('getNotification', async (page, { rejectWithValue }) => {
	try {
		const res = await get(`notification`);
		return res?.data;
	} catch (error) {
		return rejectWithValue(error?.response?.data);
	}
});

export const updateNotification = createAsyncThunk('updateNotification', async (page, { rejectWithValue }) => {
	try {
		const res = await get(`messages?page=${page}`);
		return res?.data;
	} catch (error) {
		return rejectWithValue(error?.response?.data);
	}
});
