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
        if(filter && filter.length > 0 && filter?.includes("start_date") && filter?.includes("end_date")){
            const newSearch = filter + "&id=" + user?.data?.id_system
            dispatch(getEmployeePerformance(newSearch))
        }else{
            const now = new Date();
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            const format = (newDate)=>{
                const arr = newDate.toLocaleString().split(",");
                const newArr = arr[0].split("/");
                const month = newArr[0] <= 9 ? "0" + newArr[0] : newArr[0];
                const day = newArr[1] <= 9 ? "0" + newArr[1] : newArr[1];
                const year = newArr[2];
                return day + "-" + month + "-" + year
            }

            const newSearch = `?start_date=${format(firstDay)}&end_date=${format(lastDay)}&id=${user?.data?.id_system}`
            dispatch(getEmployeePerformance(newSearch))
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