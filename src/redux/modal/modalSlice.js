import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpenModalSetting: false,
    isOpenModalCreateCustomer: false,
    isOpenModalInformationCustomer: false,
    dataModalInformationCustomer: null,
    isOpenModalCreateUser: false,
    isOpenModalInformationUser: false,
    dataModalInformationUser: null,
    isOpenModalCreateJob: false,
    isOpenModalUpdateJob: false,
    dataModalUpdateJob: null,
    isOpenModalJobEditor: false,
    isOpenInformationJob: false,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers : {
        setIsOpenModalSetting: (state, { payload })=>{
            state.isOpenModalSetting = payload
        },
        setIsOpenModalCreateCustomer: (state, { payload })=>{
            state.isOpenModalCreateCustomer = payload
        },
        setIsOpenModalInformationCustomer: (state, { payload })=>{
            state.isOpenModalInformationCustomer = payload
        },
        setDataModalInformationCustomer: (state, { payload })=>{
            state.dataModalInformationCustomer = payload
        },
        setIsOpenModalCreateUser: (state, { payload })=>{
            state.isOpenModalCreateUser = payload
        },
        setIsOpenModalInformationUser: (state, { payload })=>{
            state.isOpenModalInformationUser = payload
        },
        setDataModalInformationUser: (state, { payload })=>{
            state.dataModalInformationUser = payload
        },
        setIsOpenModalCreateJob: (state, { payload })=>{
            state.isOpenModalCreateJob = payload
        },
        setIsOpenModalUpdateJob: (state, { payload })=>{
            state.isOpenModalUpdateJob = payload
        },
        setDataModalUpdateJob: (state, { payload })=>{
            state.dataModalUpdateJob = payload
        },
        setIsOpenModalJobEditor: (state, { payload })=>{
            state.isOpenModalJobEditor = payload
        },
        setIsOpenInformationJob: (state, { payload })=>{
            state.isOpenInformationJob = payload
        },
    }
})

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
 } = modalSlice.actions
export default modalSlice.reducer
