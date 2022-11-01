import React,{ useEffect } from 'react'
import Table from "../../../components/table/Table";
import { table_dashboard } from '../../../components/table/header_table';
import { JOB_DONE,JOB_PENDING,JOB_CANCEL } from '../../../constants';
import { dashboardRequest } from '../../../redux/dashboard/action';
import {useDispatch} from "react-redux"

//data//////////////////
import { data_dashBoard } from '../../../dataJson';
//data//////////////////

const Dashboard = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(dashboardRequest())
  },[dispatch])

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
      haveTotalTable={true}
      header={table_dashboard}
      handleRowClick={handleRowClick}
      status_done={JOB_DONE}
      status_pending={JOB_PENDING}
      status_cancel={JOB_CANCEL}
      />
  )
}

export default Dashboard 