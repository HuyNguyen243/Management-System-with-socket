import React from 'react'
import Table from "../../../components/table/Table";
import { table_payment_managerment } from '../../../components/table/header_table';
import { PAY_DONE,PAY_PENDING } from '../../../constants';


//data//////////////////
import { data_payment_manager } from '../../../dataJson';

const PaymentManagement = () => {

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
      dataTable={data_payment_manager} 
      handleSort={handleSort} 
      DataFilter={DataFilter}
      haveTotalTable={false}
      header={table_payment_managerment}
      handleRowClick={handleRowClick}
      status_done={PAY_DONE}
      status_pending={PAY_PENDING}
      />
  )
}

export default PaymentManagement