import { createSlice } from '@reduxjs/toolkit';

import { getEmployeePerformance, kpiYearOfMonth, jobsStaffSaler, jobsStaffEditor } from './action';

const initialState = {
	employeePerformance: {
		loading: false,
		data: null,
		error: false,
	},
	kpis: {
		loading: false,
		data: null,
		error: false,
	},
	jobsStaffSaler: {
		loading: false,
		data: null,
		error: false,
	},
	jobsStaffEditor: {
		loading: false,
		data: null,
		error: false,
	},
};
const employeePerformanceReducer = createSlice({
	name: 'employeePerformance',
	initialState,
	reducers: {
		resetKpis: (state) => {
			state.employeePerformance.data = null;
		},
	},
	extraReducers: {
		[getEmployeePerformance.pending]: (state) => {
			Object.assign(
				state,
				{},
				{
					employeePerformance: {
						loading: true,
					},
				}
			);
		},
		[getEmployeePerformance.fulfilled]: (state, action) => {
			Object.assign(
				state,
				{},
				{
					employeePerformance: {
						loading: false,
						data: action.payload,
						error: false,
					},
				}
			);
		},
		[getEmployeePerformance.rejected]: (state, action) => {
			Object.assign(
				state,
				{},
				{
					employeePerformance: {
						loading: false,
						data: null,
						error: true,
					},
				}
			);
		},

		[kpiYearOfMonth.pending]: (state) => {
			Object.assign(
				state,
				{},
				{
					kpis: {
						loading: true,
					},
				}
			);
		},
		[kpiYearOfMonth.fulfilled]: (state, action) => {
			Object.assign(
				state,
				{},
				{
					kpis: {
						loading: false,
						data: action.payload,
						error: false,
					},
				}
			);
		},
		[kpiYearOfMonth.rejected]: (state, action) => {
			Object.assign(
				state,
				{},
				{
					kpis: {
						loading: false,
						data: null,
						error: true,
					},
				}
			);
		},

		[jobsStaffSaler.pending]: (state) => {
			Object.assign(
				state,
				{},
				{
					jobsStaffSaler: {
						loading: true,
					},
				}
			);
		},
		[jobsStaffSaler.fulfilled]: (state, action) => {
			Object.assign(
				state,
				{},
				{
					jobsStaffSaler: {
						loading: false,
						data: action.payload,
						error: false,
					},
				}
			);
		},
		[jobsStaffSaler.rejected]: (state, action) => {
			Object.assign(
				state,
				{},
				{
					jobsStaffSaler: {
						loading: false,
						data: null,
						error: true,
					},
				}
			);
		},

		[jobsStaffEditor.pending]: (state) => {
			Object.assign(
				state,
				{},
				{
					jobsStaffEditor: {
						loading: true,
					},
				}
			);
		},
		[jobsStaffEditor.fulfilled]: (state, action) => {
			Object.assign(
				state,
				{},
				{
					jobsStaffEditor: {
						loading: false,
						data: action.payload,
						error: false,
					},
				}
			);
		},
		[jobsStaffEditor.rejected]: (state, action) => {
			Object.assign(
				state,
				{},
				{
					jobsStaffEditor: {
						loading: false,
						data: null,
						error: true,
					},
				}
			);
		},
	},
});

export const { resetKpis } = employeePerformanceReducer.actions;

export default employeePerformanceReducer.reducer;
