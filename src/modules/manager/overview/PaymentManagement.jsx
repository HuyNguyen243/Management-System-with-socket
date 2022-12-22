import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Table from "../../../components/table/Table";
import { table_payment_managerment } from '../../../components/table/header_table';
import { getPayRequest } from '../../../redux/payment/actionPay';
import { dataParseManagement } from '../payment/dataParse';
import { getJobsAdminRequest } from '../../../redux/overviewJobs/actionJobs';
import {
    setIsOpenInformationJob,
    setDataModalInformationJob,
    setIsOpenModalInformationUser,
    setDataModalInformationUser
} from '../../../redux/modal/modalSlice';
import { getEmployeeRequest } from "../../../redux/overviewEmployee/actionEmployee";

const PaymentManagement = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth?.user);
    const payment = useSelector(state => state.payment?.getpay);
    const jobs = useSelector(state => state.jobs?.getjobs)
    const [filter, setFilter] = useState("");
    const employees = useSelector(state => state.employee?.inforuser)

    useEffect(() => {
        let id = user?.data?.id_system
        const data_search = [filter, id]
        dispatch(getPayRequest(data_search))
    }, [dispatch, filter, user])

    const DataFilter = (data) => {
        setFilter(data)
    }
    useEffect(() => {
        const data_push = {}
        if (jobs?.data) {
            data_push.data = {};
            Object.assign(data_push.data, jobs?.data?.infor, jobs?.data?.infor_id, jobs?.data?.cost)
            dispatch(setDataModalInformationJob(data_push))
        }
    }, [dispatch, jobs]);

    useEffect(() => {
        if (employees?.data) {
            dispatch(setDataModalInformationUser(employees))
        }
    }, [employees, dispatch])
    const handleRowClick = (rowdata) => {
        const el = rowdata.originalEvent.target.closest("td").childNodes[1];
        const data = {}
        if (el.className.includes("id_job")) {
            data.id = el.innerHTML;
            dispatch(getJobsAdminRequest(data));
            dispatch(setIsOpenInformationJob(true))
        } else if (el.className.includes("staff_is_pay")) {
            //OPEN EDITOR 
            const data = {}
            if (el.innerHTML) {
                data.id = el.innerHTML;
                dispatch(getEmployeeRequest(data));
                dispatch(setIsOpenModalInformationUser(true))
            }
        }
    }

    return (
        <Table
            dataTable={dataParseManagement(payment?.data)}
            loading={payment?.loading}
            DataFilter={DataFilter}
            haveTotalTable={false}
            header={table_payment_managerment}
            handleRowClick={(e) => handleRowClick(e)}
            name_btn_add={false}
            handleCreate={false}
        />
    )
}

export default PaymentManagement