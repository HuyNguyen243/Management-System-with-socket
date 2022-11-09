import React, { useEffect, useState } from 'react'
import Table from "../../../components/table/Table";
import { table_employee_overview } from '../../../components/table/header_table';
import { dashboardEmployeeRequest } from '../../../redux/overviewEmployee/actionEmployee';
import { useDispatch, useSelector } from "react-redux"
import CreateUser from '../../modal/CreateUser';
import { dataParse } from '../admin/dataParse';
import InformationUser from '../../modal/InformationUser';
const EmployeeOverview = () => {

    const dispatch = useDispatch()
    const employees = useSelector(state => state.employee.dashboard)
    const [isOpenCreateUser, setIsOpenCreateUser] = useState(false)
    const [isOpenInformationUser, setIsOpenInformationUser] = useState(false)
    const [rowdata, setRowData] = useState(null)
    useEffect(() => {
        dispatch(dashboardEmployeeRequest())
    }, [dispatch])

    const DataFilter = (data) => {
        // console.log(data)
    }

    const handleRowClick = (rowData) => {
        setIsOpenInformationUser(true)
        setRowData(rowData)
    }

    const handleCreate = () => {
        setIsOpenCreateUser(true)
    }

    return (
        <>
            <Table
                dataTable={dataParse(employees?.data)}
                loading={false}
                DataFilter={DataFilter}
                haveTotalTable={false}
                header={table_employee_overview}
                handleRowClick={handleRowClick}
                name_btn_add={"Thêm nhân viên"}
                handleCreate={handleCreate}
            />
            <CreateUser isOpenCreateUser={isOpenCreateUser} setIsOpenCreateUser={setIsOpenCreateUser} />
            <InformationUser
                isOpenInformationUser={isOpenInformationUser}
                setIsOpenInformationUser={setIsOpenInformationUser}
                rowdata={rowdata}
            />
        </>

    )
}

export default EmployeeOverview 