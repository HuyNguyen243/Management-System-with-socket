import React from 'react'
import Table from "../../../components/table/Table";
import { table_jobs_overview } from '../../../components/table/header_table';
import { JOB_DONE,JOB_PENDING,JOB_CANCEL } from '../../../constants';

const JobsOverview = () => {
  const DataFilter = (data)=>{
    console.log(data)
  }

  const handleSort = (e)=>{
    console.log(e.currentTarget)
  }

  const handleRowClick = (e)=>{
    console.log(e)
  }

  return (
      <Table 
      dataTable={[]} 
      handleSort={handleSort} 
      DataFilter={DataFilter}
      haveTotalTable={false}
      have_btn_add={true}
      header={table_jobs_overview}
      handleRowClick={handleRowClick}
      status_done={JOB_DONE}
      status_pending={JOB_PENDING}
      status_cancel={JOB_CANCEL}
      />
  )
}

export default JobsOverview