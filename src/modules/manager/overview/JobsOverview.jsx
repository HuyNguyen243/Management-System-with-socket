import React,{useState} from 'react'
import Table from "../../../components/table/Table";
import { table_jobs_overview } from '../../../components/table/header_table';
import { JOB_DONE,JOB_PENDING,JOB_CANCEL } from '../../../constants';
import CreateJobs from '../../modal/CreateJobs';

const JobsOverview = () => {
  const [isOpenCreateJob,setIsOpenCreateJob] = useState(false)
  const DataFilter = (data)=>{
    console.log(data)
  }

  const handleSort = (e)=>{
    console.log(e.currentTarget)
  }

  const handleRowClick = (e)=>{
    console.log(e)
  }

  const handleCreateJob = ()=>{
    setIsOpenCreateJob(true)
  }

  return (
    <>
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
      handleCreateJob={handleCreateJob}
      />
      <CreateJobs isOpenCreateJob={isOpenCreateJob} setIsOpenCreateJob={setIsOpenCreateJob}/>
    </>
  )
}

export default JobsOverview