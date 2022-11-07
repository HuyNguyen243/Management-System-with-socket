import React from 'react'
import Table from "../../../../components/table/Table";
import { table_work_flowManager } from '../../../../components/table/header_table';

const WorkflowManagement = () => {

  const DataFilter = (data)=>{
    console.log(data)
  }

  const handleRowClick = (e)=>{
    
  }

  return (
    <Table 
      dataTable={[]} 
      loading ={false}
      DataFilter={DataFilter}
      haveTotalTable={false}
      header={table_work_flowManager}
      handleRowClick={handleRowClick}
      name_btn_add={true}
      handleCreate= {false}
    />
  )
}

export default WorkflowManagement