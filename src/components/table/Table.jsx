import React,{ useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux"
import { customer_status,user_status } from "./status"
import Filter from './Filter'
import TotalTable from './TotalTable'
import Paginate from './Paginate';
import PerPage from "./PerPage";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TableTotal from "../../modules/manager/sale/workFlowManager/TableTotal"
import TableBody from "./TableBody"
import { getCountData } from '../../redux/tableSlice';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Table = ({
    dataTable = [],
    loading,
    DataFilter,
    haveTotalTable,
    header,
    handleRowClick,
    name_btn_add,
    handleCreate
}) => {
    const [currentItems, setCurrentItems] = useState([]);
    const [perpage, setPerpage] = React.useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [sortBy, setSortBy] = useState("");
    const [sortValue, setSortValue] = useState("");
    const [ dropdown,setDropDown ] = useState(customer_status);
    const location = useLocation()
    const { pathname } = location
    const dispatch = useDispatch()
    const old_Data = Array.isArray(dataTable) ? dataTable : []

    const handleSort = (e)=>{
        setSortBy(e.currentTarget.getAttribute("data-by"))
        setSortValue(e.currentTarget.getAttribute("data-value"))
    }

    useEffect(()=>{
        dispatch(getCountData(currentItems.length))
    },[dispatch,currentItems])
    const headerTable = (header,sort_by)=>{
        const value = typeof sort_by === "string" ? sort_by : ""
        if(header)
        return(
        <div className="table__header-col" >
        <span className="table__header-name">{header?.name}
            {
                header?.haveSort &&
                <div className="table__sort">
                    <img src={`../../images/${sortBy === value && sortValue === "ASC" && value !== "" ? "sort_up_disable":"sort_up"}.svg`} 
                    alt="" className="sort__up" data-by={value} data-value="ASC" onClick={handleSort}
                    />
                    <img src={`../../images/${sortBy === value && sortValue === "DESC" && value !== "" ? "sort_down_disable":"sort_down"}.svg`} 
                    alt="" className="sort__down" 
                    data-by={value} data-value="DESC" onClick={handleSort}
                    />
                </div>
            }
        </span>
         
        </div>
    )}
    useEffect(() => {
        if(pathname.split('/')[1].split('-')[0] === "employee")
        {
            setDropDown(user_status);
        } 
    },[pathname])
    const bodyTable = (rowData,item,table)=>{
        if(table)
            return(
                <TableBody rowData={rowData} item={item}/>
            )
    }
    
  return (
    <div className="page">
        {
            name_btn_add &&
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={handleCreate}>&#43; {name_btn_add}</Button>
            </Stack>
        }
        <br />
        <Filter 
        DataFilter={DataFilter}  
        sortBy={sortBy} 
        sortValue={sortValue}
        setSortBy={setSortBy}
        setSortValue={setSortValue}
        setDropDown={dropdown}
        />

        {
            pathname === "/workflow-management" &&
            <TableTotal data={old_Data}/>
        }
        {haveTotalTable && <TotalTable />}
        <div className="table__container">
            <PerPage perpage={perpage} setPerpage={setPerpage}/>
            <DataTable
            loading={loading}
            value={ old_Data.length > 0 ? currentItems : old_Data} 
            responsiveLayout="stack"
            breakpoint="1113px"
            onRowClick={handleRowClick}
            lazy
            >
            {
                old_Data?.length > 0 
                ?
                Object?.keys(old_Data?.[0]).map((item,index)=>{
                    return(
                        header?.[index] &&
                        <Column 
                        key={index}
                        field={item || ""}  
                        body={(rowData)=>( bodyTable(rowData,item,header?.[index]))}
                        header={()=>headerTable(header?.[index],item)}
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