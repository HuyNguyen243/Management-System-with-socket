import { createSlice } from "@reduxjs/toolkit";

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
};

const modalSlice = createSlice({
    name: "modal",
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
        setDataModalInformationUser: (state, { payload }) => {
            state.dataModalInformationUser = payload;
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
    setIsOpenModalJobEditor,
    setIsOpenInformationJob,
    setDataModalInformationJob,
} = modalSlice.actions;
export default modalSlice.reducer;
