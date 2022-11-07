import React,{ useState,useEffect } from 'react'
import Table from "../../../../components/table/Table";
import { table_customer_management } from '../../../../components/table/header_table';
import CreateCustomer from '../../../modal/CreateCustomer';
import { saleCustomerRequest } from '../../../../redux/sale/action';
import { useDispatch, useSelector } from 'react-redux';
import { dataParse } from './dataParse';
import InformationCustomer from "../../../modal/InformationCustomer"

const CustomerManager = () => {
  const dispatch = useDispatch()
  const [isOpenCreateCustomer,setIsOpenCreateCustomer] = useState(false)
  const [isOpenInformationCustomer, setIsOpenInformationCustomer] = useState(false)
  const [rowdata, setRowData] = useState(null)
  const customers = useSelector(state=>state.sale.customers)
  const [filter,setFilter] = useState(null)
  
  useEffect(()=>{
    if(filter && filter !== ""){
      dispatch(saleCustomerRequest(filter))
    }
  },[dispatch,filter])

  const DataFilter = (data)=>{
    setFilter(data)
  }

  const handleRowClick = (rowData)=>{
    setIsOpenInformationCustomer(true)
    setRowData(rowData)
  }

  const handleCreate = ()=>{
    setIsOpenCreateCustomer(true)
  }
  
  return (
    <>
      <Table 
      dataTable={dataParse(customers?.data)}
      loading ={customers?.loading}
      DataFilter={DataFilter}
      haveTotalTable={false}
      header={table_customer_management}
      handleRowClick={handleRowClick}
      name_btn_add={"tạo khách hàng mới"}
      handleCreate={handleCreate}
      />
      <CreateCustomer isOpenCreateCustomer={isOpenCreateCustomer} setIsOpenCreateCustomer={setIsOpenCreateCustomer} />
      <InformationCustomer 
        isOpenInformationCustomer={isOpenInformationCustomer} 
        setIsOpenInformationCustomer={setIsOpenInformationCustomer} 
        rowdata={rowdata}
      />
    </>
  )
}

export default CustomerManager