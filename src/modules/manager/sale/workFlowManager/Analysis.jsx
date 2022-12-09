import React,{ useState,useEffect } from 'react'
import { Chart } from 'primereact/chart';
import { initialDataChart } from '../../overview/employeePerformance/dataparse';
import {  useSelector } from "react-redux"

const Analysis = () => {
    const [chartData,setChartData] = useState(initialDataChart);
    const performance = useSelector(state => state.performanceReducer.employeePerformance)
    
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
                    }
                ],
            }
            setChartData(_data)
        }
    },[setChartData,performance])

    const checkData = ()=>{
        if(performance?.data){
            if(performance?.data?.job_pending > 0 || performance?.data?.job_incomplete > 0 ||  performance?.data?.job_complete > 0){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }

  return (
    <div className="grid" style={{height: "350px"}}>
     
        <div className="field col-12 md:col-12 ">
            {
                checkData() &&
                <p className="chart__title">Jobs</p>
            }
            <Chart type="doughnut" data={chartData} className="chart_donut"/>
        </div>
    </div>
  )
}

export default Analysis