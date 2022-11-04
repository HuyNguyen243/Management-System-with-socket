import React,{useState} from 'react'
import Table from "../../../components/table/Table";
import { table_jobs_overview } from '../../../components/table/header_table';
import CreateJobs from '../../modal/CreateJobs';
import CreateCustomer from '../../modal/CreateCustomer';
import InformationCustomer from '../../modal/InformationCustomer';
import InformationJobs from '../../modal/InformationJobs';
import ModalJobEditor from '../../modal/ModalJobEditor';
import UpdateInformationJob from '../../modal/UpdateInformationJob';

const JobsOverview = () => {
  const [isOpenCreateJob,setIsOpenCreateJob] = useState(false)
  const [isOpenCreateCustomer,setIsOpenCreateCustomer] = useState(false)
  const [isOpenInformationCustomer,setIsOpenInformationCustomer] = useState(false)
  const [isOpenInformationJob,setIsOpenInformationJob] = useState(false)
  const [isOpenJobEditor,setIsOpenJobEditor] = useState(false)
  const [isOpenUpdateInformationJob, setIsOpenUpdateInformationJob] = useState(false)

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
      handleCreateJob={handleCreateJob}
      />
      <CreateJobs isOpenCreateJob={isOpenCreateJob} setIsOpenCreateJob={setIsOpenCreateJob} setIsOpenCreateCustomer={setIsOpenCreateCustomer}/>
      <CreateCustomer isOpenCreateCustomer={isOpenCreateCustomer} setIsOpenCreateCustomer={setIsOpenCreateCustomer} />
      <InformationCustomer isOpenInformationCustomer={isOpenInformationCustomer} setIsOpenInformationCustomer={setIsOpenInformationCustomer} />
      <InformationJobs isOpenInformationJob={isOpenInformationJob} setIsOpenInformationJob={setIsOpenInformationJob} />
      <ModalJobEditor isOpenJobEditor={isOpenJobEditor} setIsOpenJobEditor={setIsOpenJobEditor} />
      <UpdateInformationJob isOpenUpdateInformationJob={isOpenUpdateInformationJob} setIsOpenUpdateInformationJob={setIsOpenUpdateInformationJob}/>
    </>
  )
}

export default JobsOverview