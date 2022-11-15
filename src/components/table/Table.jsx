import React,{ useState, useEffect } from 'react';
import { useDispatch } from "react-redux"
import { customer_status,user_status } from "./status"
import Filter from './Filter'
import TotalTable from './TotalTable'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TableTotal from "../../modules/manager/sale/workFlowManager/TableTotal"
import TableBody from "./TableBody"
import { Button } from 'primereact/button';
import { paginate } from "./paginate"
import Stack from '@mui/material/Stack';
import { useNavigate, useLocation } from 'react-router-dom';

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
    const navigate = useNavigate()
    const location = useLocation()
    const { pathname } = location
    const [perpage, setPerpage] = React.useState(10);
    const [sortBy, setSortBy] = useState("");
    const [sortValue, setSortValue] = useState("");
    const [ dropdown,setDropDown ] = useState(customer_status);
    const dispatch = useDispatch()
    const old_Data = Array.isArray(dataTable) ? dataTable : []
    const [currentLocation, setCurrentLocation] = useState(0);
    const [search,setsearch ] = useState('');

    const urlParams = new URLSearchParams(window.location.search);
    const pageURL = Number(urlParams?.get('page'))
    const perpageURL = Number(urlParams?.get('perpage'))

    useEffect(()=>{
        if(perpageURL){
            setPerpage(perpageURL)
        }
        if(pageURL){
            setCurrentLocation(pageURL * perpageURL - perpageURL)
        }
    },[perpageURL, pageURL])



    const handleSetPage = (event) => {
        setCurrentLocation(event.first);
        setPerpage(event.rows);
        let result = "";
        if(search === ""){
            result = `page=${event.page + 1}&perpage=${event.rows}`
        }else{
            result = `${search}&page=${event.page + 1}&perpage=${event.rows}`
        }
        navigate({
            pathname: pathname,
            search: result
        })
    }
    
    const handleSort = (e)=>{
        setSortBy(e.currentTarget.getAttribute("data-by"))
        setSortValue(e.currentTarget.getAttribute("data-value"))
    }

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
        search={search}
        setsearch={setsearch}
        />
        
        {
            pathname === "/workflow-management" &&
            <TableTotal data={old_Data}/>
        }
        {haveTotalTable && <TotalTable />}
        <div className="table__container">
            <div className="table__perpage" >
                {Object.keys(old_Data).length > 0 && <span>Rows per page:</span>}
            </div>
            <DataTable
            loading={loading}
            value={ old_Data } 
            responsiveLayout="stack"
            breakpoint="1113px"
            onRowClick={handleRowClick}
            paginator 
            paginatorTemplate={Object.keys(old_Data).length > 0 ? paginate : false} 
            first={currentLocation}
            rows={perpage} 
            onPage={handleSetPage}
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
        </div>
    </div>
  )
}

export default Table