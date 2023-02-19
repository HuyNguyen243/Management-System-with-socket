import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpenModalSetting: false,
	isOpenModalCreateCustomer: false,
	isOpenModalInformationCustomer: false,
	dataModalInformationCustomer: null,
	isOpenModalCreateUser: false,
	isOpenModalInformationUser: false,
	dataModalInformationUser: null,
	isOpenModalCreateJob: false,
	isOpenModalJobEditor: false,
	isOpenInformationJob: false,
	dataModalInformationJob: null,
	isOpenModalInformationPayment: false,
	dataModalInformationPayment: null,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setIsOpenModalSetting: (state, { payload }) => {
			state.isOpenModalSetting = payload;
		},
		setIsOpenModalCreateCustomer: (state, { payload }) => {
			state.isOpenModalCreateCustomer = payload;
		},
		setIsOpenModalInformationCustomer: (state, { payload }) => {
			state.isOpenModalInformationCustomer = payload;
		},
		setDataModalInformationCustomer: (state, { payload }) => {
			state.dataModalInformationCustomer = payload;
		},
		setIsOpenModalCreateUser: (state, { payload }) => {
			state.isOpenModalCreateUser = payload;
		},
		setIsOpenModalInformationUser: (state, { payload }) => {
			state.isOpenModalInformationUser = payload;
		},
		setIsOpenModalInformationPayment: (state, { payload }) => {
			state.isOpenModalInformationPayment = payload;
		},
		setDataModalInformationUser: (state, { payload }) => {
			state.dataModalInformationUser = payload;
		},
		setDataModalInformationPayment: (state, { payload }) => {
			state.dataModalInformationPayment = payload;
		},
		setIsOpenModalCreateJob: (state, { payload }) => {
			state.isOpenModalCreateJob = payload;
		},
		setIsOpenModalJobEditor: (state, { payload }) => {
			state.isOpenModalJobEditor = payload;
		},
		setIsOpenInformationJob: (state, { payload }) => {
			state.isOpenInformationJob = payload;
		},
		setDataModalInformationJob: (state, { payload }) => {
			state.dataModalInformationJob = payload;
		},
	},
});

export const {
	setIsOpenModalSetting,

	setIsOpenModalCreateCustomer,

	setIsOpenModalInformationCustomer,
	setDataModalInformationCustomer,

	setIsOpenModalCreateUser,

	setIsOpenModalInformationUser,
	setDataModalInformationUser,

	setIsOpenModalCreateJob,

	setIsOpenModalUpdateJob,
	setDataModalUpdateJob,

	setIsOpenModalJobEditor,

	setIsOpenInformationJob,
	setDataModalInformationJob,

	setIsOpenModalInformationPayment,
	setDataModalInformationPayment,
} = modalSlice.actions;
export default modalSlice.reducer;
