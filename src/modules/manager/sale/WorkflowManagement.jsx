import React from 'react'
import Table from "../../../components/table/Table";
import { table_work_flowManager } from '../../../components/table/header_table';
import { JOB_DONE,JOB_PENDING,JOB_CANCEL } from '../../../constants';

//data//////////////////
import { data_WorkflowManagement } from '../../../dataJson';
//data//////////////////

const WorkflowManagement = () => {

  const DataFilter = (data)=>{
    console.log(data)
  }

  const handleSort = (e)=>{
    console.log(e.currentTarget)
  }

  const handleRowClick = (e)=>{
    
  }

  return (
      <Table 
      dataTable={data_WorkflowManagement} 
      handleSort={handleSort} 
      DataFilter={DataFilter}
      haveTotalTable={false}
      have_btn_add={true}
      header={table_work_flowManager}
      handleRowClick={handleRowClick}
      status_done={JOB_DONE}
      status_pending={JOB_PENDING}
      status_cancel={JOB_CANCEL}
      />
  )
}

export default WorkflowManagement