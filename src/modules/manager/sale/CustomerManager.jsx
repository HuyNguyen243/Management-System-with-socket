import React from 'react'
import Table from "../../../components/table/Table";
import { CUSTOMER_REQUEST_DONE, CUSTOMER_REQUEST_PENDING, CUSTOMER_REQUEST_CANCEL } from '../../../constants';
import { table_customer_management } from '../../../components/table/header_table';

import { data_customersManager } from '../../../dataJson';

const CustomerManager = () => {

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
      dataTable={data_customersManager} 
      handleSort={handleSort} 
      DataFilter={DataFilter}
      haveTotalTable={false}
      header={table_customer_management}
      handleRowClick={handleRowClick}
      status_done={CUSTOMER_REQUEST_DONE}
      status_pending={CUSTOMER_REQUEST_PENDING}
      status_cancel={CUSTOMER_REQUEST_CANCEL}
      />
  )
}

export default CustomerManager