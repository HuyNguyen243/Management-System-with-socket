import React from 'react'
import Table from "../../../components/table/Table";
import { table_dashboard } from '../../../components/table/header_table';

const Dashboard = () => {

    const DataFilter = (data) => {
        console.log(data)
    }

    const handleRowClick = (e) => {
        console.log(e)
    }

    return (
        <>
            <Table
                dataTable={[]}
                loading={false}
                DataFilter={DataFilter}
                haveTotalTable={true}
                header={table_dashboard}
                handleRowClick={handleRowClick}
                name_btn_add={false}
                handleCreate={false}
            />
        </>
    )
}

export default Dashboard 