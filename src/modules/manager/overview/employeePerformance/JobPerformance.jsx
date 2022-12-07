import React, { useEffect, useState } from 'react'

import { dashboardEmployeeRequest } from '../../../../redux/overviewEmployee/actionEmployee';
import { useDispatch,useSelector } from "react-redux";
import Table from "../../../../components/table/Table";
import { table_performance } from '../../../../components/table/header_table';
import { getEmployeePerformance, kpiYearOfMonth } from "../../../../redux/employeePerformance/action";
import { dataParse, initialDataChart, horizontalOptions } from "./dataparse";
import { Chart } from 'primereact/chart';

const JobPerformance = () => {
    const dispatch = useDispatch()
    const performance = useSelector(state => state.performanceReducer.employeePerformance)
    const [search,setSearch] = useState("")

    const [chartData,setChartData] = useState(initialDataChart);
    const user = useSelector(state=> state.auth.user)

    useEffect(() => {
        if(performance?.data) {
            const _data = {
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
    },[setChartData,performance])

    const [basicData] = useState({
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        datasets: [
            {
                label: 'KPI YEAR',
                backgroundColor: '#42A5F5',
                data: [65, 59, 80, 81, 56, 55, 40,0,0]
            },
        ]
    });

    useEffect(() => {
            dispatch(dashboardEmployeeRequest())
            dispatch(kpiYearOfMonth(`?id=${user?.data?.id_system}`))
    }, [dispatch, user])

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
        if(data === ""){
            setChartData(initialDataChart)
        }
    }
    const handleRowClick = (rowdata) => {}

    const checkData = ()=>{
        if(data){
            for(const index in data){
                if(data[index] > 0){
                    return true
                }
            }
            return false
        }else{
            return false
        }
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
                        <Chart type="bar" data={basicData} options={horizontalOptions} />
                    </div>
                </div>
                <div className="field col-12 md:col-4 ">
                    <Chart type="doughnut" data={chartData}
                    style={{ position: 'relative', width: '60%', paddingTop: "200px", marginLeft: "100px"}} className="pt-9"
                    />

                    <div className="flex pt-6 grid">
                        {
                            data?.job_pending && data?.job_incomplete && data?.job_complete && checkData 
                            ?
                            <>
                                <div className="field col-4 md:col-4 chart__color red">Tạm hoãn</div>
                                <div className="field col-4 md:col-4 chart__color yellow">Đang xử lý</div>
                                <div className="field col-4 md:col-4 chart__color blue">Hoàn thành</div>
                            </>
                            :
                            ""
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default JobPerformance