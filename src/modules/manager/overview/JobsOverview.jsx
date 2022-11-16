import React, { useState, useEffect } from 'react'
import Table from "../../../components/table/Table";
import { table_jobs_overview } from '../../../components/table/header_table';
import CreateJobs from '../../modal/CreateJobs';
import CreateCustomer from '../../modal/CreateCustomer';
import InformationCustomer from '../../modal/InformationCustomer';
import InformationJobs from '../../modal/InformationJobs';
import ModalJobEditor from '../../modal/ModalJobEditor';
import UpdateInformationJob from '../../modal/UpdateInformationJob';
import { dashboardJobsRequest } from "../../../redux/overviewJobs/actionJobs";
import { useDispatch, useSelector } from "react-redux"
import { dataParse } from "../../manager/jobs/dataParse"
const JobsOverview = () => {
    const [isOpenCreateJob, setIsOpenCreateJob] = useState(false)
    const [isOpenCreateCustomer, setIsOpenCreateCustomer] = useState(false)
    const [isOpenInformationCustomer, setIsOpenInformationCustomer] = useState(false)
    const [isOpenInformationJob, setIsOpenInformationJob] = useState(false)
    const [isOpenJobEditor, setIsOpenJobEditor] = useState(false)
    const [isOpenUpdateInformationJob, setIsOpenUpdateInformationJob] = useState(false)
    const [filter, setFilter] = useState("")
    const jobs = useSelector(state => state.jobs.dashboard)
    const dispatch = useDispatch()

import React from 'react'
import Table from "../../../components/table/Table";
import { table_jobs_overview } from '../../../components/table/header_table';
import { 
  setIsOpenModalCreateJob,
  setIsOpenModalUpdateJob,
  setDataModalUpdateJob,
 } from '../../../redux/modal/modalSlice';
import { useDispatch } from 'react-redux';


const JobsOverview = () => {
  const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(dashboardJobsRequest(filter))
    },[dispatch,filter])
    
    const DataFilter = (data) => {
        setFilter(data)
    }

    const handleRowClick = (e) => {
        console.log(e)
    }

    const handleCreate = () => {
        setIsOpenCreateJob(true)
    }

    return (
        <>
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
        </>
    )

  const handleRowClick = (rowdata)=>{
    dispatch(setIsOpenModalUpdateJob(true))
    dispatch(setDataModalUpdateJob(rowdata))
  }

  const handleCreate = ()=>{
    dispatch(setIsOpenModalCreateJob(true))
  }

  return (
    <>
      <Table 
      dataTable={[]} 
      loading ={false}
      DataFilter={DataFilter}
      haveTotalTable={false}
      header={table_jobs_overview}
      handleRowClick={handleRowClick}
      handleCreate={handleCreate}
      name_btn_add={"Tạo công việc"}
      />
    </>
  )
}

export default JobsOverview