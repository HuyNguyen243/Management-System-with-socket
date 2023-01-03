import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { dataParse } from "./dataParse";
import Table from "../../../../components/table/Table";
import { table_work_flowManager } from '../../../../components/table/header_table';
import { dashboardJobsRequest } from '../../../../redux/overviewJobs/actionJobs';
import { setIsOpenModalCreateJob, setIsOpenInformationJob, setDataModalInformationJob } from '../../../../redux/modal/modalSlice';
import { getEmployeePerformance, kpiYearOfMonth } from "../../../../redux/employeePerformance/action";

const WorkflowManagement = () => {
    const dispatch = useDispatch()
    const [filter, setFilter] = useState("")
    const jobs = useSelector(state => state.jobs?.dashboard)
    const user = useSelector(state=> state.auth.user)

    useEffect(()=>{
        dispatch(kpiYearOfMonth())
    },[dispatch])

    useEffect(() => {
        dispatch(dashboardJobsRequest(filter))

        if(filter && filter.length > 0 &&( filter?.includes("start_date") || filter?.includes("end_date"))){
            // const newSearch = filter + "&id=" + user?.data?.id_system
            // RESET_REQUEST(dispatch, newSearch, getEmployeePerformance)
        }else{
            let search = filter
            if(Object.keys(filter).length === 0){
                search = ""
            }
            dispatch(getEmployeePerformance(search))
        }
    }, [dispatch, filter, user])

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
            loading={jobs?.loading}
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