import React from 'react'
import Table from "../../../components/table/Table";
import { table_employee_overview } from '../../../components/table/header_table';
import { JOB_DONE,JOB_PENDING,JOB_CANCEL } from '../../../constants';

//data//////////////////
import { data_dashBoard } from '../../../dataJson';
//data//////////////////

const EmployeeOverview = () => {

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
    dataTable={data_dashBoard} 
    handleSort={handleSort} 
    DataFilter={DataFilter}
    haveTotalTable={false}
    header={table_employee_overview}
    handleRowClick={handleRowClick}
    status_done={JOB_DONE}
    status_pending={JOB_PENDING}
    status_cancel={JOB_CANCEL}
    />
  )
}

export default EmployeeOverview 