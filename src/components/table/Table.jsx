import React,{ useState } from 'react'

import Filter from './Filter'
import TotalTable from './TotalTable'
import Paginate from './Paginate';
import PerPage from "./PerPage";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Table = ({
    dataTable = [],
    handleSort,
    DataFilter,
    haveTotalTable,
    header,
    handleRowClick,
    status_done,
    status_pending,
    status_cancel,
    have_btn_add,
    handleCreateJob
}) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [perpage, setPerpage] = React.useState(10);
  const [pageCount, setPageCount] = useState(0);

    const DONE = ["REQUEST","PAID","COMPLETE","ONLINE"]
    const PENDING = ["PENDING","UNPAY","INCOMPLETE","LEAVING"]
    const CANCEL = ["UNREQUEST","CANCEL","FIXED","OFFLINE"]

    const old_Data = Array.isArray(dataTable) ? dataTable : []
    
    const headerTable = (header,sort_value)=>{
        if(header)
        return(
        <div className="table__header-col" >
        <span className="table__header-name">{header?.name}
            {
                header?.haveSort &&
                <div className="table__sort">
                    <img src="../../images/sort_up.svg" alt="" className="sort__up" data-by={sort_value} data-value="ASC" onClick={handleSort}/>
                    <img src="../../images/sort_down.svg" alt="" className="sort__down" data-by={sort_value} data-value="DESC" onClick={handleSort}/>
                </div>
            }
        </span>
         
        </div>
    )}

    const bodyTable = (name,item,table)=>{
        if(table)
        if(!item.includes("status")){
            return (
                <span className={`table__body-name ${table?.element_body_text}`}>{name[item]}</span>
            )
        }else{
            if(DONE.includes(name[item])){
                return (
                    <span className="table__body-name center btn_success">{status_done}</span>
                )
            }else if(PENDING.includes(name[item])){
                return (
                    <span className="table__body-name center btn_pending">{status_pending}</span>
                )
            }else if(CANCEL.includes(name[item])){
                return (
                    <span className="table__body-name center btn_stop">{status_cancel}</span>
                )
            }
        }
    }
  return (
    <div className="page">
        {
            have_btn_add &&
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={handleCreateJob}>&#43; Tạo công việc</Button>
            </Stack>
        }
        <br />
        <Filter DataFilter={DataFilter} />
        {haveTotalTable && <TotalTable />}
        <div className="table__container">
            <PerPage perpage={perpage} setPerpage={setPerpage}/>
            <DataTable value={currentItems} responsiveLayout="stack" breakpoint="1113px" 
            onRowClick={handleRowClick}
            >
            {
                old_Data?.length > 0 
                ?
                Object.keys(old_Data?.[0]).map((item,index)=>{
                    return(
                        header?.[index] &&
                        <Column 
                        key={index}
                        field={item || ""}  
                        body={(rowData)=>( bodyTable(rowData,item,header?.[index]))}
                        header={()=>headerTable(header?.[index],item.name)}
                        />
                    )
                })
                :
                header?.map((item,index)=>{
                    return (
                        <Column 
                        key={index}
                        field={item || ""}  
                        body=""
                        header={()=>headerTable(header?.[index],item)}
                        />
                    )
                })
            }
            </DataTable>
            <Paginate 
                setCurrentItems={setCurrentItems} 
                setPageCount={setPageCount} 
                perpage={perpage}
                dataTable={old_Data}
                pageCount={pageCount}
                setPerpage={setPerpage}
            />
        </div>
    </div>
  )
}

export default Table