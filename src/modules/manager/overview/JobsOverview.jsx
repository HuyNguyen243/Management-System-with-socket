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

    useEffect(() => {
        if (employees?.data) {
            dispatch(setIsOpenModalInformationUser(true))
            dispatch(setDataModalInformationUser(employees))
        }
    }, [employees, dispatch])
    const DataFilter = (data) => {
        setFilter(data)
    }

    const handleRowClick = (rowdata) => {
        const el = rowdata.originalEvent.target.closest("td").childNodes[1]
        if(el.className.includes("id_saler")){
            //OPEN SALE

            // const data = {}
            // data.id = e.target.innerHTML;
            // dispatch(getEmployeeRequest(data));
        }else if(el.className.includes("id_customer")){
            //OPEN CUSTOMER

            dispatch(setIsOpenModalInformationCustomer(true))
        }else if(el.className.includes("id_editor")){
            //OPEN EDITOR
        }
        else{
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
            handleRowClick={(e)=>handleRowClick(e)}
            handleCreate={handleCreate}
            name_btn_add={"Tạo công việc"}
        />
    )
}

export default JobsOverview