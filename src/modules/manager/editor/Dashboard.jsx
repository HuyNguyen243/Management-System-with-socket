import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Table from "../../../components/table/Table";
import { dataParse } from "./dataParse";
import { dashboardJobsRequest } from '../../../redux/overviewJobs/actionJobs';
import { table_dashboard } from '../../../components/table/header_table';
import { setIsOpenInformationJob, setDataModalInformationJob } from '../../../redux/modal/modalSlice';

const Dashboard = () => {

    const dispatch = useDispatch()
    const [filter, setFilter] = useState("")
    const jobs = useSelector(state => state.jobs?.dashboard)
    
    useEffect(() => {
        dispatch(dashboardJobsRequest(filter))
    }, [dispatch, filter])

    const DataFilter = (data) => {
        setFilter(data)
    }

    const handleRowClick = (rowdata) => {
        if (rowdata) {
            dispatch(setIsOpenInformationJob(true))
            dispatch(setDataModalInformationJob(rowdata))
        }
    }

    return (
        <>
            <Table
                dataTable={dataParse(jobs?.data)}
                loading={false}
                DataFilter={DataFilter}
                haveTotalTable={false}
                header={table_dashboard}
                handleRowClick={(e) => handleRowClick(e)}
                name_btn_add={false}
                handleCreate={false}
            />
        </>
    )
}

export default Dashboard 