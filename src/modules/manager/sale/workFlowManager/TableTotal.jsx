import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { table_total_work_flowManager } from '../../../../components/table/header_table';
import Analysis from './Analysis';

const TableTotal = ({data}) => {
  const header = table_total_work_flowManager

  const headerTable = (name)=>{
    return(
      <div className="table__header-col" >
        <span className="table__header-name">{name}</span>
      </div>
  )}

  const dataTable =[
    {
      jobs_total: 1000000,
      count: 1000000,
      ratio_1: "100%",
      ratio_2: "100%",
    }
  ]

  return (
    <>
      <div className="table__analysis">
        <Analysis />
      </div>
      <DataTable value={dataTable} responsiveLayout="stack" breakpoint="1113px" className="table__total--workflow--management">
        {
          Object.keys(dataTable[0])?.map((item,index)=>(
            <Column
            key={index}
            body={dataTable[0]?.[item]}
            header={()=>headerTable(header?.[index]?.name)}
            />
          ))
        }
      </DataTable>
    </>
  )
}

export default TableTotal