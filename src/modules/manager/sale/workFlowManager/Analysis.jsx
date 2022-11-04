import React,{useState} from 'react'
import { Chart } from 'primereact/chart';

const Analysis = () => {

    const [chartData] = useState({
        labels: ['A', 'B', 'C'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
    });

    const [lineStylesData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            type: 'line',
            label: 'Dataset 1',
            borderColor: '#42A5F5',
            borderWidth: 2,
            fill: false,
            tension: .4,
            data: [
                50,
                25,
                12,
                48,
                56,
                76,
                42
            ]
        }, {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: '#66BB6A',
            data: [
                21,
                84,
                24,
                75,
                37,
                65,
                34
            ],
            borderColor: 'white',
            borderWidth: 2
        }, {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: '#FFA726',
            data: [
                41,
                52,
                24,
                74,
                23,
                21,
                32
            ]
        }]
    });

  return (
    <div className="grid" style={{height: "400px"}}>
        <div className="field col-12 md:col-4 flex align-items-center" >
            <Chart type="bar" data={lineStylesData}  className="chart_bar"/>
        </div>
        <div className="field col-12 md:col-4 ">
            <p className="chart__title">KPI</p>
            <Chart type="doughnut" data={chartData} className="chart_donut"/>
        </div>
        <div className="field col-12 md:col-4 ">
            <p className="chart__title">Jobs</p>
            <Chart type="doughnut" data={chartData} className="chart_donut"/>
        </div>
    </div>
  )
}

export default Analysis