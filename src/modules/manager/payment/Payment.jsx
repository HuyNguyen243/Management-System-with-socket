import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Table from "../../../components/table/Table";
import { table_payment } from '../../../components/table/header_table';
import { getPayRequest } from '../../../redux/payment/actionPay';
import { dataParse } from './dataParse';
import {
    setIsOpenInformationJob,
    setDataModalInformationJob,
} from '../../../redux/modal/modalSlice';
import { getJobsRequest } from '../../../redux/overviewJobs/actionJobs';
const Payment = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth?.user);
    const payment = useSelector(state => state.payment?.getpay);
    const jobs = useSelector(state => state.jobs?.getjobs)

    const [filter, setFilter] = useState("");

    useEffect(() => {
        let id = user?.data?.id_system
        const data_search = [filter, id]
        dispatch(getPayRequest(data_search))
    }, [dispatch, filter, user])

    useEffect(() => {
        const data_push = {}
        if (jobs?.data) {
            data_push.data = {};
            Object.assign(data_push.data, jobs?.data?.infor,jobs?.data?.infor_id,jobs?.data?.cost)
            dispatch(setIsOpenInformationJob(true))
            dispatch(setDataModalInformationJob(data_push))
        }
    }, [dispatch, jobs]);
    const DataFilter = (data) => {
        setFilter(data)
    }

    const handleRowClick = (rowdata) => {
        const el = rowdata.originalEvent.target.closest("td").childNodes[1];
        const data = {}
        if (el.className.includes("id_job")) {
            data.id = el.innerHTML;
            dispatch(getJobsRequest(data));
        }
    }

    return (
        <Table
            dataTable={dataParse(payment?.data)}
            loading={payment?.loading}
            DataFilter={DataFilter}
            haveTotalTable={true}
            header={table_payment}
            handleRowClick={(e) => handleRowClick(e)}
            name_btn_add={false}
            handleCreate={false}
        />
    )
}

export default Payment