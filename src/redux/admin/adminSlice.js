import { createSlice } from '@reduxjs/toolkit';
import { settingRequest, updateRequest } from './action';

const initialState = {
	system: {
		loading: false,
		data: null,
		error: false,
	},
	editsystem: {
		loading: false,
		data: null,
		error: false,
	},
};

const settingReducer = createSlice({
	name: 'setting',
	initialState,
	extraReducers: {
		[settingRequest.pending]: (state) => {
			Object.assign(
				state,
				{},
				{
					system: {
						loading: true,
					},
				}
			);
		},
		[settingRequest.fulfilled]: (state, action) => {
			Object.assign(
				state,
				{},
				{
					system: {
						loading: false,
						data: action.payload?.data,
						error: false,
					},
				}
			);
		},
		[settingRequest.rejected]: (state, action) => {
			Object.assign(
				state,
				{},
				{
					system: {
						loading: false,
						data: null,
						error: true,
					},
				}
			);
		},
		[updateRequest.pending]: (state) => {
			Object.assign(
				state,
				{},
				{
					editsystem: {
						loading: true,
					},
				}
			);
		},
		[updateRequest.fulfilled]: (state, action) => {
			Object.assign(
				state,
				{},
				{
					editsystem: {
						loading: false,
						data: action.payload?.data,
						error: false,
					},
				}
			);
			state.system = action?.payload?.data;
		},
		[updateRequest.rejected]: (state, action) => {
			Object.assign(
				state,
				{},
				{
					editsystem: {
						loading: false,
						data: null,
						error: true,
					},
				}
			);
		},
	},
});

export default settingReducer.reducer;
