import React from 'react'
import Table from "../../../components/table/Table";
import { table_payment } from '../../../components/table/header_table';

//data//////////////////
import { data_payment } from '../../../dataJson';
//data//////////////////

const Payment = () => {
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
        dataTable={data_payment} 
        handleSort={handleSort} 
        DataFilter={DataFilter}
        haveTotalTable={true}
        header={table_payment}
        handleRowClick={handleRowClick}
    />
  )
}

export default Payment