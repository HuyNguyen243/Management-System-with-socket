import React, { useEffect,useState } from 'react'
import Table from "../../../components/table/Table";
import { table_employee_overview } from '../../../components/table/header_table';
import { dashboardEmployeeRequest } from '../../../redux/overviewEmployee/actionEmployee';
import { useDispatch, useSelector } from "react-redux"
import CreateUser from '../../modal/CreateUser';
const EmployeeOverview = () => {

    const dispatch = useDispatch()
    const employees = useSelector(state => state.employee.dashboard)
    const [openModel, setModel ] =  useState(false)
    useEffect(() => {
        dispatch(dashboardEmployeeRequest())
    }, [dispatch])

    const DataFilter = (data) => {
        console.log(data)
    }

    const handleRowClick = (e) => {
        console.log(e)
    }

    const handleCreate = () => {
        setModel(true)
    }

    return (
        <>
            <Table
                dataTable={employees?.data}
                loading={false}
                DataFilter={DataFilter}
                haveTotalTable={false}
                header={table_employee_overview}
                handleRowClick={handleRowClick}
                name_btn_add={"Thêm nhân viên"}
                handleCreate={handleCreate}
            />
            <CreateUser isOpenCreateCustomer={openModel} setIsOpenCreateCustomer={setModel}/>
        </>

    )
}

export default EmployeeOverview 