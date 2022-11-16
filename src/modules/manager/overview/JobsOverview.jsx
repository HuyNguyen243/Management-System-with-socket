import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { dataParse } from "../../manager/jobs/dataParse"
import Table from "../../../components/table/Table";
import { table_jobs_overview } from '../../../components/table/header_table';
import { 
  setIsOpenModalCreateJob,
  setIsOpenModalUpdateJob,
  setDataModalUpdateJob,
 } from '../../../redux/modal/modalSlice';
 import { dashboardJobsRequest } from "../../../redux/overviewJobs/actionJobs";


const JobsOverview = () => {
  const dispatch = useDispatch()
  const [filter, setFilter] = useState("")
  const jobs = useSelector(state => state.jobs.dashboard)

    useEffect(()=>{
        dispatch(dashboardJobsRequest(filter))
    },[dispatch,filter])
    
    const DataFilter = (data) => {
        setFilter(data)
    }

    const handleRowClick = (rowdata) => {
        dispatch(setIsOpenModalUpdateJob(true))
        dispatch(setDataModalUpdateJob(rowdata))
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
          handleRowClick={handleRowClick}
          handleCreate={handleCreate}
          name_btn_add={"Tạo công việc"}
      />
    )
}

export default JobsOverview