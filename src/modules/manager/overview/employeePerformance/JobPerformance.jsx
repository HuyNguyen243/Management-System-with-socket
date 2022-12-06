import React, { useEffect } from 'react'

import { dashboardEmployeeRequest } from '../../../../redux/overviewEmployee/actionEmployee';
import { useDispatch } from "react-redux";
import Table from "../../../../components/table/Table";
import { table_dashboard } from '../../../../components/table/header_table';
import { getEmployeePerformance } from "../../../../redux/employeePerformance/action";

const JobPerformance = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(dashboardEmployeeRequest())
    }, [dispatch])

    const DataFilter = (data) => {
        if(data.length > 0 && data.includes("id")) {
            dispatch(getEmployeePerformance(data))
        }
    }

    const handleRowClick = (rowdata) => {
     
    }

    return (
        <>
            <div className="grid col-8">
                <Table
                    dataTable={[]}
                    loading={false}
                    DataFilter={DataFilter}
                    haveTotalTable={false}
                    header={table_dashboard}
                    handleRowClick={(e) => handleRowClick(e)}
                    name_btn_add={false}
                    handleCreate={false}
                />
            </div>
            <div className="grid col-4">

            </div>
        </>
    )
}

export default JobPerformance