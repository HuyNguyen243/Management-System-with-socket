import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { dataParse } from "../../manager/jobs/dataParse"
import Table from "../../../components/table/Table";
import { table_jobs_overview } from '../../../components/table/header_table';
import {
    setIsOpenModalCreateJob,
    setIsOpenInformationJob,
    setIsOpenModalInformationCustomer,
    setDataModalInformationCustomer,
    setDataModalInformationJob,
    setIsOpenModalInformationUser,
    setDataModalInformationUser
} from '../../../redux/modal/modalSlice';
import { dashboardJobsRequest } from "../../../redux/overviewJobs/actionJobs";
import { getEmployeeRequest } from "../../../redux/overviewEmployee/actionEmployee";
import { getCustomerRequest } from "../../../redux/sale/action";
const JobsOverview = () => {
    const dispatch = useDispatch()
    const [filter, setFilter] = useState("")
    const jobs = useSelector(state => state.jobs?.dashboard)
    const employees = useSelector(state => state.employee?.inforuser)
    const customer = useSelector(state => state.sale?.getcustomer)
    useEffect(() => {
        dispatch(dashboardJobsRequest(filter))
    }, [dispatch, filter])

    useEffect(() => {
        if (employees?.data) {
            dispatch(setIsOpenModalInformationUser(true))
            dispatch(setDataModalInformationUser(employees))
        }
    }, [employees, dispatch])

    useEffect(() => {
        if (customer?.data) {
            dispatch(setIsOpenModalInformationCustomer(true))
            dispatch(setDataModalInformationCustomer(customer))
        }
    }, [customer, dispatch])

    const DataFilter = (data) => {
        setFilter(data)
    }

    const handleRowClick = (rowdata) => {
        const el = rowdata.originalEvent.target.closest("td").childNodes[1]
        console.log(el.className.includes("id_saler"));
        
        if (el.className.includes("id_saler")) {
            //OPEN SALE
            const data = {}
            if (el.innerHTML) {
                data.id = el.innerHTML;
                dispatch(getEmployeeRequest(data));
            }
        } else if (el.className.includes("id_customer")) {
            //OPEN CUSTOMER
            const data = {}
            if (el.innerHTML) {
                data.id = el.innerHTML;
                dispatch(getCustomerRequest(data))
            }
        } else if (el.className.includes("id_editor")) {
            //OPEN EDITOR
            const data = {}
            if (el.innerHTML) {
                data.id = el.innerHTML;
                dispatch(getEmployeeRequest(data));
            }
        }
        else {
            dispatch(setIsOpenInformationJob(true))
            dispatch(setDataModalInformationJob(rowdata))
        }
    }

    const handleCreate = () => {
        dispatch(setIsOpenModalCreateJob(true))
    }

    return (
        <Table
            dataTable={dataParse(jobs?.data)}
            loading={false}
            DataFilter={DataFilter}
            haveTotalTable={false}
            header={table_jobs_overview}
            handleRowClick={(e) => handleRowClick(e)}
            handleCreate={handleCreate}
            name_btn_add={"Tạo công việc"}
        />
    )
}

export default JobsOverview