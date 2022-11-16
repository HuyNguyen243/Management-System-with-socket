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

  const DataFilter = (data)=>{
    // console.log(data)
  }

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