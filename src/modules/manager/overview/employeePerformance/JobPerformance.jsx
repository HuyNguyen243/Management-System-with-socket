import React, { useEffect, useState } from 'react'

import { dashboardEmployeeRequest } from '../../../../redux/overviewEmployee/actionEmployee';
import { useDispatch,useSelector } from "react-redux";
import Table from "../../../../components/table/Table";
import { table_performance } from '../../../../components/table/header_table';
import { getEmployeePerformance, kpiYearOfMonth } from "../../../../redux/employeePerformance/action";
import { dataParse, initialDataChart, horizontalOptions } from "./dataparse";
import { Chart } from 'primereact/chart';
import { Calendar } from 'primereact/calendar';


const JobPerformance = () => {
    const dispatch = useDispatch()
    const performance = useSelector(state => state.performanceReducer.employeePerformance)

    const kpisYear = useSelector(state => state.performanceReducer?.kpis)
    const [search,setSearch] = useState("")
    const [year, setyear] = useState(null);

    const [chartData,setChartData] = useState(initialDataChart);
    const user = useSelector(state=> state.auth.user)


    useEffect(() => {
        if(performance?.data) {
            const _data = {
                labels: ['Tạm hoãn', 'Đang xử lý', 'Đã hoàn thành'],
                datasets: [
                    {
                        data: [
                            performance?.data ? performance?.data?.job_pending : 100,
                            performance?.data ? performance?.data?.job_incomplete : 100,
                            performance?.data ? performance?.data?.job_complete : 100
                        ],
                        backgroundColor: [
                            "#FF6384",
                            "#FFCE56",
                            "#0061F4",
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#FFCE56",
                            "#0061F4",
                        ]
                    }]
            }
            setChartData(_data)
        }
    },[performance])

    const [dataKPis,setDataKPis] = useState({
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        datasets: [{
            type: 'bar',
            label: 'KPI YEAR',
            backgroundColor: '#0061F4',
            data: [0,0,0,0,0,0,0,0,0,0,0,0]
        },
        {
            type: 'bar',
            label: 'default',
            backgroundColor: 'transparent',
            data: [100]
        }
        ]
    });

    useEffect(() => {
            dispatch(dashboardEmployeeRequest("?saler=true"))
            const getYear = new Date().getFullYear()
            dispatch(kpiYearOfMonth(`?year=${getYear}`))
    }, [dispatch, user])

    useEffect(() => {
        if(kpisYear?.data){
            let data = [0,0,0,0,0,0,0,0,0,0,0,0]
            if(kpisYear?.data.length > 0){
                for(const item of kpisYear?.data){
                    let index = (item?.month).split("-")[1]
                    data[index - 1] = (item?.kpi).toFixed(0)
                }
            }
            
            setDataKPis({
                labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
                datasets: [
                    {
                        type: 'bar',
                        label: 'KPI YEAR',
                        backgroundColor: '#0061F4',
                        data: data
                    },
                    {
                        type: 'bar',
                        label: '',
                        backgroundColor: 'transparent',
                        data: [100]
                    }
                ]
            },)
        }
}, [kpisYear])

    const data = dataParse(performance?.data)

    useEffect(() => {
        if(search !== "" && search.includes("end_date") && search.includes("id")){
            dispatch(getEmployeePerformance(search))
        }
    },[dispatch,search])

    const DataFilter = (data) => {
        if(data.length > 0 && data.includes("id")) {
            setSearch(data)
        }
    }

    const handleRowClick = (rowdata) => {}

    const handleChangeYear = (e)=>{
        setyear(e.value)
        let getYear = new Date(e.value).getFullYear()
        if(getYear === 1970){
            getYear = new Date().getFullYear()
        }
        dispatch(kpiYearOfMonth(`?year=${getYear}`))
    }
    
    return (
        <>
            <div className="grid ">
                <div className="field col-12 md:col-8">
                    <Table
                        dataTable={performance?.data ? [data] :[]}
                        loading={false}
                        DataFilter={DataFilter}
                        haveTotalTable={false}
                        header={table_performance}
                        handleRowClick={(e) => handleRowClick(e)}
                        name_btn_add={false}
                        handleCreate={false}
                    />
                    <div className="pt-2" style={{paddingLeft:"90px"}}>
                        <Calendar id="yearpicker " className="w-3 calendar__year" value={year} onChange={handleChangeYear} view="year" dateFormat="yy" placeholder="Chọn năm"/>
                        <Chart type="bar" data={dataKPis} options={horizontalOptions} max={100}/>
                    </div>
                </div>
                <div className="field col-12 md:col-4 ">
                    <Chart type="doughnut" data={chartData}
                    style={{ position: 'relative', width: '60%', paddingTop: "200px", marginLeft: "100px"}} className="pt-9"
                    />
                </div>
            </div>
        </>
    )
}

export default JobPerformance