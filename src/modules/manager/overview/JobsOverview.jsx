import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { dataParse } from "../../manager/jobs/dataParse"
import Table from "../../../components/table/Table";
import { table_jobs_overview } from '../../../components/table/header_table';
import {
    setIsOpenModalCreateJob,
    setIsOpenInformationJob,
    setIsOpenModalInformationCustomer,
    setDataModalInformationJob,
    setIsOpenModalInformationUser,
    setDataModalInformationUser
} from '../../../redux/modal/modalSlice';
import { dashboardJobsRequest } from "../../../redux/overviewJobs/actionJobs";
import { getEmployeeRequest } from "../../../redux/overviewEmployee/actionEmployee";
const JobsOverview = () => {
    const dispatch = useDispatch()
    const [filter, setFilter] = useState("")
    const jobs = useSelector(state => state.jobs?.dashboard)
    const employees = useSelector(state => state.employee?.inforuser)
    useEffect(() => {
        dispatch(dashboardJobsRequest(filter))
    }, [dispatch, filter])

    const DataFilter = (data) => {
        setFilter(data)
    }

    const handleRowClick = (rowdata) => {
        dispatch(setIsOpenInformationJob(true))
        dispatch(setDataModalInformationJob(rowdata))
    }

    useEffect(() => {
        const handleClickOutSide = (e) => {
            const customer = document.querySelector(".id_customer").closest("td")
            const sale = document.querySelector(".id_saler").closest("td")
            // const editor = document.querySelector(".id_editor").closest("td")

            if (customer?.contains(e.target)) {
                dispatch(setIsOpenModalInformationCustomer(true))
            }
            if (sale?.contains(e.target)) {
                const data = {}
                data.id = e.target.innerHTML;
                dispatch(getEmployeeRequest(data));
                dispatch(setIsOpenModalInformationUser(true))
                console.log(employees);
                // dispatch(setDataModalInformationUser(employees))
            }
            //  else if (sale?.contains(e.target)) {

            // } else if (editor?.contains(e.target)) {

            // } else if (!editor?.contains(e.target) && !sale?.contains(e.target) && !customer?.contains(e.target) && table?.contains(e.target)) {
            //     dispatch(setIsOpenInformationJob(true))
            // }
        }

        window.addEventListener('mousedown', handleClickOutSide);
        return () => {
            window.removeEventListener('mousedown', handleClickOutSide)
        }

    })

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
            handleRowClick={handleRowClick}
            handleCreate={handleCreate}
            name_btn_add={"Tạo công việc"}
        />
    )
}

export default JobsOverview