import React, { useEffect, useState } from 'react'
import Table from "../../../components/table/Table";
import { table_employee_overview } from '../../../components/table/header_table';
import { dashboardEmployeeRequest } from '../../../redux/overviewEmployee/actionEmployee';
import { useDispatch, useSelector } from "react-redux"
import { dataParse } from '../admin/dataParse';
import { 
    setIsOpenModalCreateUser,
    setIsOpenModalInformationUser,
    setDataModalInformationUser,
 } from '../../../redux/modal/modalSlice';
 
const EmployeeOverview = () => {

    const dispatch = useDispatch()
    const employees = useSelector(state => state.employee.dashboard)
    const [filter, setFilter] = useState("")


    useEffect(() => {
        dispatch(dashboardEmployeeRequest(filter))
    }, [dispatch,filter])

    
    const DataFilter = (data) => {
        setFilter(data)
    }

    const handleRowClick = (rowData) => {
        dispatch(setIsOpenModalInformationUser(true))
        dispatch(setDataModalInformationUser(rowData))
    }

    const handleCreate = () => {
        dispatch(setIsOpenModalCreateUser(true))
    }

    return (
        <>
            <Table
                dataTable={dataParse(employees?.data)}
                loading={employees?.loading}
                DataFilter={DataFilter}
                haveTotalTable={false}
                header={table_employee_overview}
                handleRowClick={handleRowClick}
                name_btn_add={"Thêm nhân viên"}
                handleCreate={handleCreate}
            />
        </>

    )
}

export default EmployeeOverview 