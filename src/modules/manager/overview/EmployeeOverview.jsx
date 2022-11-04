import React,{ useEffect } from 'react'
import Table from "../../../components/table/Table";
import { table_employee_overview } from '../../../components/table/header_table';
import { dashboardEmployeeRequest } from '../../../redux/overviewEmployee/actionEmployee';
import {useDispatch,useSelector} from "react-redux"

const EmployeeOverview = () => {

  const dispatch = useDispatch()
  const employees = useSelector(state=>state.employee.dashboard)

  useEffect(() => {
    dispatch(dashboardEmployeeRequest())
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
    dataTable={employees?.data} 
    handleSort={handleSort} 
    DataFilter={DataFilter}
    haveTotalTable={false}
    header={table_employee_overview}
    handleRowClick={handleRowClick}
    />
  )
}

export default EmployeeOverview 