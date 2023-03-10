import { createAsyncThunk } from '@reduxjs/toolkit';
import { post, get, del, put } from '../../_services/apiRequest';
import { storage } from '../../_services/sesionStorage';
import { NAME_SESSION_STORAGE_TOKEN, ROOM_SESSION_MESSAGES, UserRules } from '../../constants';
import jwt_decode from 'jwt-decode';
import { successToast, errorToast } from '../../commons/toast';
import { URL_ROUTER } from '../../routes/routes';

export const userloginRequest = createAsyncThunk('user_login', async (req, { rejectWithValue }) => {
	try {
		const res = await post('auth/login', req.data);
		storage.save(NAME_SESSION_STORAGE_TOKEN, res?.data?.access_token);

		const decodedToken = jwt_decode(res?.data?.access_token);
		let url;
		if (decodedToken.role === UserRules.ROLE.ADMIN) {
			url = URL_ROUTER.JOB_OVERVIEW;
		} else if (decodedToken.role === UserRules.ROLE.SALER) {
			url = URL_ROUTER.WORKFLOW_MANAGEMENT;
		} else if (decodedToken.role === UserRules.ROLE.LEADER_EDITOR || decodedToken.role === UserRules.ROLE.EDITOR) {
			url = URL_ROUTER.DASHBOARD;
		} else {
			url = URL_ROUTER.NOT_FOUND;
		}

		window.location.href = url;

		return res.data;
	} catch (error) {
		return rejectWithValue(error?.response?.data);
	}
});

export const userLogoutRequest = createAsyncThunk('user_logout', async (data, { rejectWithValue }) => {
	try {
		const res = await del('auth/logout');
		setTimeout(() => {
			storage.delete(NAME_SESSION_STORAGE_TOKEN);
			storage.delete(ROOM_SESSION_MESSAGES);
			storage.delete('birth');
		}, 300);
		return res.data;
	} catch (error) {
		return rejectWithValue(error?.response?.data);
	}
});

export const userProfile = createAsyncThunk('userProfile', async (id, { rejectWithValue }) => {
	try {
		const res = await get(`users/infor/${id}`);
		storage.save('birth', res?.data?.births);
		return res;
	} catch (error) {
		storage.delete(NAME_SESSION_STORAGE_TOKEN);
		storage.delete('birth');
		return rejectWithValue(error?.response?.data);
	}
});

export const userEditProfile = createAsyncThunk('userEditProfile', async (result, { rejectWithValue }) => {
	try {
		const res = await put(`users/infor/update/${result.id}`, result?.data);
		if (res) {
			storage.save('birth', res?.data?.births);
			successToast('C???p nh???t th??nh c??ng');
		}
		return res?.data;
	} catch (error) {
		errorToast('C???p nh???t th???t b???i');
		return rejectWithValue(error?.response?.data);
	}
});

export const userChangeStatus = createAsyncThunk('changeStatus', async (result, { rejectWithValue }) => {
	try {
		await put(`users/infor/status/${result.id}?status=${result.status}`);
		return result.newUser;
	} catch (error) {
		return rejectWithValue(error?.response?.data);
	}
});

export const forgotPassword = createAsyncThunk('forgotPassword', async (data, { rejectWithValue }) => {
	try {
		const res = await post(`auth/password-reset`, data);
		return res;
	} catch (error) {
		return rejectWithValue(error?.response?.data?.message);
	}
});

export const userGetReminderRequest = createAsyncThunk('getReminderRequest', async (data, { rejectWithValue }) => {
	try {
		const res = await get(`users/reminders`);
		return res;
	} catch (error) {
		return rejectWithValue(error?.response?.data?.message);
	}
});

export const resetPassword = createAsyncThunk('resetPassword', async (data, { rejectWithValue }) => {
	try {
		if (!data?.token) {
			return false;
		}
		const res = await put(`auth/password-reset/${data?.id}`, data);
		return res;
	} catch (error) {
		return rejectWithValue(error?.response?.data?.message);
	}
});
