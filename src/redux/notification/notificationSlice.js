import { createSlice } from '@reduxjs/toolkit';
import { createNotification, getNotification, updateNotification } from './action';

const initialState = {
	notification: {
		isLoading: false,
		data: null,
		error: false,
	},
	fetchAllNotification: {
		isLoading: false,
		data: null,
		error: false,
	},

	updatenotification: {
		isLoading: false,
		data: null,
		error: false,
	},
	notifications: [],
};

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		getNotify: (state, { payload }) => {
			Object.assign(
				state,
				{},
				{
					notifications: payload,
				}
			);
		},
	},
	extraReducers: {
		[createNotification.pending]: (state) => {
			Object.assign(
				state,
				{},
				{
					notification: {
						loading: true,
					},
				}
			);
		},
		[createNotification.fulfilled]: (state, action) => {
			Object.assign(
				state,
				{},
				{
					notification: {
						loading: false,
						data: action.payload,
						error: false,
					},
				}
			);
		},
		[createNotification.rejected]: (state, action) => {
			Object.assign(
				state,
				{},
				{
					notification: {
						loading: false,
						data: null,
						error: true,
					},
				}
			);
		},

		[getNotification.pending]: (state) => {
			Object.assign(
				state,
				{},
				{
					fetchAllNotification: {
						loading: true,
					},
				}
			);
		},
		[getNotification.fulfilled]: (state, action) => {
			Object.assign(
				state,
				{},
				{
					fetchAllNotification: {
						loading: false,
						data: action.payload,
						error: false,
					},
				}
			);
		},
		[getNotification.rejected]: (state, action) => {
			Object.assign(
				state,
				{},
				{
					fetchAllNotification: {
						loading: false,
						data: null,
						error: true,
					},
				}
			);
		},

		[updateNotification.pending]: (state) => {
			Object.assign(
				state,
				{},
				{
					updatenotification: {
						loading: true,
					},
				}
			);
		},
		[updateNotification.fulfilled]: (state, action) => {
			Object.assign(
				state,
				{},
				{
					updatenotification: {
						loading: false,
						data: action.payload,
						error: false,
					},
				}
			);
		},
		[updateNotification.rejected]: (state, action) => {
			Object.assign(
				state,
				{},
				{
					updatenotification: {
						loading: false,
						data: null,
						error: true,
					},
				}
			);
		},
	},
});
export const { getNotify } = notificationSlice.actions;

export default notificationSlice.reducer;
