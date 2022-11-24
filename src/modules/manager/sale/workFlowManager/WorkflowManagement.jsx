import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { dataParse } from "./dataParse";
import Table from "../../../../components/table/Table";
import { table_work_flowManager } from '../../../../components/table/header_table';
import { dashboardJobsRequest } from '../../../../redux/overviewJobs/actionJobs';
import { setIsOpenModalCreateJob, setIsOpenInformationJob, setDataModalInformationJob } from '../../../../redux/modal/modalSlice';

const WorkflowManagement = () => {
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
    const handleCreate = () => {
        dispatch(setIsOpenModalCreateJob(true))
    }
    return (
        <Table
            dataTable={dataParse(jobs?.data)}
            loading={false}
            DataFilter={DataFilter}
            haveTotalTable={false}
            header={table_work_flowManager}
            handleRowClick={(e) => handleRowClick(e)}
            name_btn_add={"Tạo công việc"}
            handleCreate={handleCreate}
        />
    )
}

export default WorkflowManagement